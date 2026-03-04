import { NextResponse } from 'next/server';
import { getNotifications, addNotification } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const agent = searchParams.get('agent');
    const unacknowledgedOnly = searchParams.get('pending') === 'true';

    let notifications = await getNotifications();

    // Filter by agent (return their notifications + ALL-targeted ones)
    if (agent) {
        notifications = notifications.filter(
            n => n.targetAgent === agent || n.targetAgent === 'ALL'
        );
    }

    // Filter to unacknowledged only
    if (unacknowledgedOnly) {
        notifications = notifications.filter(n => !n.acknowledged);
    }

    // Sort newest first
    notifications.sort((a, b) => b.timestamp - a.timestamp);

    return NextResponse.json({
        notifications,
        count: notifications.length,
        unacknowledged: notifications.filter(n => !n.acknowledged).length,
    });
}

export async function POST(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { type, title, message, targetAgent, eventId } = body;

        if (!type || !title || !message || !targetAgent) {
            return NextResponse.json(
                { error: 'Missing required fields: type, title, message, targetAgent' },
                { status: 400 }
            );
        }

        const notification = await addNotification({
            type,
            title,
            message,
            targetAgent,
            eventId,
        });

        return NextResponse.json({ success: true, notification }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
    }
}
