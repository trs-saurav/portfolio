import { NextResponse } from 'next/server';

export function get(res : NextResponse) {
    return NextResponse.json({ message: 'PORTFOLIO API DETAIL' });
}

