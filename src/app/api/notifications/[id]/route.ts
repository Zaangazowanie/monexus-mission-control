import { NextResponse } from 'next/server';
import { acknowledgeNotification } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const { agentName } = body;

        if (!agentName) {
            return NextResponse.json({ error: 'agentName is required' }, { status: 400 });
        }

        const notification = await acknowledgeNotification(id, agentName);
        if (!notification) {
            return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, notification });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to acknowledge notification' }, { status: 500 });
    }
}
