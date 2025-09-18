import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/fileUtils';


export async function POST(req: Request) {
    const payload = await req.json();
    const calls = readJSON<any[]>('calls.json') || [];


    const entry = {
        id: payload.call_id || `call-${Date.now()}`,
        timestamp: new Date().toISOString(),
        transcript: payload.transcript || payload.text || null,
        duration: payload.duration || payload.call_duration || null,
        metadata: payload.metadata || {},
        function_results: payload.function_results || null,
        raw: payload
    };


    calls.unshift(entry);
    writeJSON('calls.json', calls);


    return NextResponse.json({ ok: true, saved: entry.id });
}