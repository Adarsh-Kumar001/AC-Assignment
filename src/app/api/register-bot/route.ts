import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, domain, prompt } = body

  if (!name || !domain || !prompt) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // OpenMic API endpoint to create an agent
  const res = await fetch('https://api.openmic.ai/agents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENMIC_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      domain,
      prompt
    })
  })

  const data = await res.json()
  return NextResponse.json(data)
}
