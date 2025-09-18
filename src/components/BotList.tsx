'use client'
import { useEffect, useState } from 'react'

export default function BotList() {
  const [bots, setBots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  // Load all bots
  async function load() {
    setLoading(true)
    setErr('')
    try {
      const res = await fetch('/api/bots')
      const data = await res.json().catch(() => null)

      if (Array.isArray(data)) setBots(data)
      else if (Array.isArray(data?.data)) setBots(data.data)
      else if (Array.isArray(data?.bots)) setBots(data.bots)
      else setBots([])
    } catch (e: any) {
      console.error('Failed to fetch bots', e)
      setErr('Failed to load bots')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // Delete a bot
  async function del(botUid: string, name?: string) {
    if (!confirm(`Delete bot ${name || botUid}?`)) return
    try {
      const res = await fetch("/api/bots", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botUid }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Delete failed")
      alert("Bot deleted successfully")
      load() // refresh list
    } catch (err: any) {
      console.error(err)
      alert(err.message || "Delete failed")
    }
  }

  if (loading) return <div>Loading bots…</div>
  if (err) return <div className="text-red-500">{err}</div>

  return (
    <div className="space-y-2">
      {bots.length === 0 && <div className="text-gray-500">No bots</div>}
      {bots.map(b => (
        <div key={b.id || b.uid} className="p-3 bg-white rounded shadow flex justify-between items-center">
          <div>
            <div className="font-semibold">{b.name || b.title}</div>
            <div className="text-xs text-gray-500">{b.domain || b.meta?.domain} • {b.id || b.uid}</div>
          </div>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => del(b.uid, b.name)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
