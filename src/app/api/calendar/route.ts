import { NextResponse } from 'next/server';
import { getCalendarEvents, addCalendarEvent } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const agent = searchParams.get('agent');
    const type = searchParams.get('type');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    let events = await getCalendarEvents();

    // Filter by agent (return only their pending events)
    if (agent) {
        events = events.filter(e => (e.agent === agent || e.agent === 'ALL') && !e.completed);
    }

    // Filter by type
    if (type) {
        events = events.filter(e => e.type === type);
    }

    // Filter by date range
    if (from) {
        events = events.filter(e => e.timestamp >= parseInt(from));
    }
    if (to) {
        events = events.filter(e => e.timestamp <= parseInt(to));
    }

    return NextResponse.json({ events, count: events.length });
}

export async function POST(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, agent, type, timestamp, notes, priority, createdBy } = body;

        if (!title || !agent || !type || !timestamp) {
            return NextResponse.json(
                { error: 'Missing required fields: title, agent, type, timestamp' },
                { status: 400 }
            );
        }

        const newEvent = await addCalendarEvent({
            title,
            agent,
            type,
            timestamp,
            notes,
            priority: priority || 'medium',
            createdBy: createdBy || 'system',
        });

        return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
