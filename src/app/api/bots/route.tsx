import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/fileUtils';


export async function GET() {
    const bots = readJSON<any[]>('bots.json') || [];
    return NextResponse.json(bots);
}


export async function POST(req: Request) {
    const body = await req.json();
    const bots = readJSON<any[]>('bots.json') || [];
    const newBot = { id: `bot-${Date.now()}`, ...body };
    bots.push(newBot);
    writeJSON('bots.json', bots);
    return NextResponse.json(newBot);
}