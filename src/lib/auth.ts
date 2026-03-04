import { NextResponse } from 'next/server';

const VALID_TOKENS = ['bob-token-2026', 'lucy-token-2026', 'shadow-token-2026', 'zo-token-2026', 'shelly-token-2026', 'mike-admin-token'];

export function isAuthenticated(req: Request) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }

    const token = authHeader.split(' ')[1];
    return VALID_TOKENS.includes(token);
}
