import { NextResponse } from 'next/server';
import { getCalendarEvents, addCalendarEvent } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const agent = searchParams.get('agent');

    const events = await getCalendarEvents();

    // If agent is specified, return only their pending events
    if (agent) {
        const agentEvents = events.filter(e => e.agent === agent && !e.completed);
        return NextResponse.json({ events: agentEvents });
    }

    // Otherwise return all events
    return NextResponse.json({ events });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, agent, type, timestamp } = body;

        if (!title || !agent || !type || !timestamp) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newEvent = await addCalendarEvent({
            title,
            agent,
            type,
            timestamp
        });

        return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
