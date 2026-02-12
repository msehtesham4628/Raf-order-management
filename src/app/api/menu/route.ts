import { NextResponse } from 'next/server';
import { menu } from '@/data';

export async function GET() {
    return NextResponse.json(menu);
}

