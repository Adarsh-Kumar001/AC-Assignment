import { NextResponse } from 'next/server'
const BASE = 'https://chat.openmic.ai/api'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const res = await fetch(`${BASE}/bots/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENMIC_API_KEY}`,
      }
    })

    const txt = await res.text().catch(()=> '')
    if (!res.ok) {
      return NextResponse.json({ error: txt || 'OpenMic delete failed' }, { status: res.status })
    }
    return NextResponse.json({ ok: true })
  } catch (err:any) {
    console.error('DELETE /api/bots/[id] error', err)
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 })
  }
}
