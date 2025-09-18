import { NextResponse } from 'next/server'

const db: Record<string, any> = {
  'MED-1001': { id: 'MED-1001', name: 'Adarsh', age: 34, allergies: ['Some flower'], meds: ['Paracetamol'], lastVisit: '2025-09-01' },
  'MED-1002': { id: 'MED-1002', name: 'Kumar', age: 45, allergies: [], meds: [], lastVisit: '2025-07-10' }
}

function normalizeId(input: string) {
  return input
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/ZERO/g, '0')
    .replace(/ONE/g, '1')
    .replace(/TWO/g, '2')
    .replace(/THREE/g, '3')
    .replace(/FOUR/g, '4')
    .replace(/FIVE/g, '5')
    .replace(/SIX/g, '6')
    .replace(/SEVEN/g, '7')
    .replace(/EIGHT/g, '8')
    .replace(/NINE/g, '9')
}

function findClosestId(input: string) {
  const normalized = normalizeId(input)
  if (db[normalized]) return normalized

  // Simple fallback: check first 3 letters + digits
  for (let key of Object.keys(db)) {
    if (key.replace('-', '').startsWith(normalized.slice(0, 3))) {
      return key
    }
  }

  return null
}

export async function POST(req: Request) {
  const body = await req.json()
  const rawId = body.id || ''
  const id = findClosestId(rawId)

  if (!id) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

  const rec = db[id]

  return NextResponse.json({
    ok: true,
    record: rec,
    speak: `Found ${rec.name}, ${rec.age} years old. Allergies: ${rec.allergies.length ? rec.allergies.join(', ') : 'None'}. Last visit ${rec.lastVisit}.`
  })
}