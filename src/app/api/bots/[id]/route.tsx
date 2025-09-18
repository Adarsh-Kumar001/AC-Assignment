import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/fileUtils';


export async function GET(_: Request, { params }: { params: { id: string } }) {
    const bots = readJSON<any[]>('bots.json') || [];
    const bot = bots.find(b => b.id === params.id);
    return bot ? NextResponse.json(bot) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const bots = readJSON<any[]>('bots.json') || [];
    const idx = bots.findIndex(b => b.id === params.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const body = await req.json();
    bots[idx] = { ...bots[idx], ...body };
    writeJSON('bots.json', bots);
    return NextResponse.json(bots[idx]);
}


export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const bots = readJSON<any[]>('bots.json') || [];
    const updated = bots.filter(b => b.id !== params.id);
    writeJSON('bots.json', updated);
    return NextResponse.json({ ok: true });
}