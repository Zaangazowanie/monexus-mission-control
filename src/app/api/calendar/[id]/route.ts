import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { getCalendarEvents, CALENDAR_FILE, CalendarEvent } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const events = await getCalendarEvents();

        const eventIndex = events.findIndex(e => e.id === id);
        if (eventIndex === -1) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        events[eventIndex] = { ...events[eventIndex], ...body };
        await fs.writeFile(CALENDAR_FILE, JSON.stringify(events, null, 2));

        return NextResponse.json({ success: true, event: events[eventIndex] });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const events = await getCalendarEvents();

        const filteredEvents = events.filter(e => e.id !== id);
        if (events.length === filteredEvents.length) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        await fs.writeFile(CALENDAR_FILE, JSON.stringify(filteredEvents, null, 2));
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
