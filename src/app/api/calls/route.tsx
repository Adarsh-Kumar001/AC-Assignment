import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/fileUtils';


export async function GET() {
    const calls = readJSON<any[]>('calls.json') || [];
    return NextResponse.json(calls);
}