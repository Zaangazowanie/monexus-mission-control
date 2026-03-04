import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
export const CALENDAR_FILE = path.join(DATA_DIR, 'calendar.json');
export const NOTIFICATIONS_FILE = path.join(DATA_DIR, 'notifications.json');

export type CalendarEvent = {
    id: string;
    title: string;
    agent: string;
    type: 'CRON' | 'SCHEDULED' | 'AUTONOMOUS';
    timestamp: number; // Unix epoch ms
    completed: boolean;
    notes?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string;
};

export type Notification = {
    id: string;
    type: 'CALENDAR_CREATED' | 'CALENDAR_UPDATED' | 'CALENDAR_DELETED' | 'MANDATE_ISSUED' | 'CONFLICT_DETECTED';
    eventId?: string;
    title: string;
    message: string;
    targetAgent: string; // 'ALL' or specific agent name
    timestamp: number;
    acknowledged: boolean;
    acknowledgedBy?: string;
    acknowledgedAt?: number;
};

// ==== INIT ====
export async function initDb() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        for (const file of [CALENDAR_FILE, NOTIFICATIONS_FILE]) {
            try {
                await fs.access(file);
            } catch {
                await fs.writeFile(file, JSON.stringify([]));
            }
        }
    } catch (err) {
        console.error('Failed to initialize local DB:', err);
    }
}

// ==== CALENDAR ====
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
    await initDb();
    try {
        const data = await fs.readFile(CALENDAR_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function addCalendarEvent(event: Omit<CalendarEvent, 'id' | 'completed'>) {
    const events = await getCalendarEvents();
    const now = Date.now();
    const newEvent: CalendarEvent = {
        ...event,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: now,
        updatedAt: now,
    };

    // Conflict detection
    const conflicts = detectConflicts(events, newEvent);
    if (conflicts.length > 0) {
        // Add conflict notification but still create the event
        for (const conflict of conflicts) {
            await addNotification({
                type: 'CONFLICT_DETECTED',
                eventId: newEvent.id,
                title: `⚠️ Schedule Conflict`,
                message: `"${newEvent.title}" conflicts with "${conflict.title}" for agent ${newEvent.agent} at ${new Date(newEvent.timestamp).toISOString()}`,
                targetAgent: newEvent.agent,
            });
        }
    }

    events.push(newEvent);
    await fs.writeFile(CALENDAR_FILE, JSON.stringify(events, null, 2));

    // Notify all agents about new event
    await addNotification({
        type: 'CALENDAR_CREATED',
        eventId: newEvent.id,
        title: `📅 New Event: ${newEvent.title}`,
        message: `New ${newEvent.type} task assigned to ${newEvent.agent}: "${newEvent.title}"`,
        targetAgent: 'ALL',
    });

    return newEvent;
}

export async function updateCalendarEvent(id: string, updates: Partial<CalendarEvent>) {
    const events = await getCalendarEvents();
    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) return null;

    const oldEvent = events[eventIndex];
    events[eventIndex] = { ...oldEvent, ...updates, updatedAt: Date.now() };
    await fs.writeFile(CALENDAR_FILE, JSON.stringify(events, null, 2));

    // Notify all agents about the update
    await addNotification({
        type: 'CALENDAR_UPDATED',
        eventId: id,
        title: `✏️ Updated: ${events[eventIndex].title}`,
        message: `Event "${events[eventIndex].title}" was modified. Agent: ${events[eventIndex].agent}. Check your schedule.`,
        targetAgent: 'ALL',
    });

    return events[eventIndex];
}

export async function deleteCalendarEvent(id: string) {
    const events = await getCalendarEvents();
    const event = events.find(e => e.id === id);
    if (!event) return false;

    const filteredEvents = events.filter(e => e.id !== id);
    await fs.writeFile(CALENDAR_FILE, JSON.stringify(filteredEvents, null, 2));

    // Notify all agents about deletion
    await addNotification({
        type: 'CALENDAR_DELETED',
        eventId: id,
        title: `🗑️ Removed: ${event.title}`,
        message: `Event "${event.title}" assigned to ${event.agent} has been cancelled/removed.`,
        targetAgent: 'ALL',
    });

    return true;
}

// ==== CONFLICT DETECTION ====
function detectConflicts(existingEvents: CalendarEvent[], newEvent: CalendarEvent): CalendarEvent[] {
    const CONFLICT_WINDOW_MS = 30 * 60 * 1000; // 30 minute window
    return existingEvents.filter(e => {
        if (e.completed) return false;
        if (e.agent !== newEvent.agent && e.agent !== 'ALL' && newEvent.agent !== 'ALL') return false;
        const timeDiff = Math.abs(e.timestamp - newEvent.timestamp);
        return timeDiff < CONFLICT_WINDOW_MS;
    });
}

// ==== NOTIFICATIONS ====
export async function getNotifications(): Promise<Notification[]> {
    await initDb();
    try {
        const data = await fs.readFile(NOTIFICATIONS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'acknowledged'>) {
    const notifications = await getNotifications();
    const newNotification: Notification = {
        ...notification,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        acknowledged: false,
    };
    notifications.push(newNotification);
    await fs.writeFile(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
    return newNotification;
}

export async function acknowledgeNotification(id: string, agentName: string) {
    const notifications = await getNotifications();
    const idx = notifications.findIndex(n => n.id === id);
    if (idx === -1) return null;

    notifications[idx] = {
        ...notifications[idx],
        acknowledged: true,
        acknowledgedBy: agentName,
        acknowledgedAt: Date.now(),
    };
    await fs.writeFile(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
    return notifications[idx];
}
