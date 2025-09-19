'use client'
import { useState } from 'react'

export default function BotForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState('MediBot-Demo')
  const [domain, setDomain] = useState('medical')
  const [prompt, setPrompt] = useState(`You are "MediBot", a medical intake assistant. On call start, introduce yourself and ask for Medical ID. When the ID is provided, call FetchMedicalRecord.`)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !prompt) { 
      setError('Name and prompt required'); 
      return 
    }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/bots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, domain, prompt })
      })
      const data = await res.json().catch(()=>({}))
      if (!res.ok) {
        setError(data?.error || 'Failed to create bot')
      } else {
        setName(''); setPrompt('')
        onCreated()
        alert('Bot created on OpenMic.')
      }
    } catch (err) {
      console.error(err)
      setError('Network/server error')
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-2 bg-gray-700 p-4 rounded-xl shadow">
      <input value={name} onChange={e=>setName(e.target.value)} className="w-full border p-2" />
      <select value={domain} onChange={e=>setDomain(e.target.value)} className="w-full border p-2">
        <option value="medical">Medical</option>
        <option value="legal">Legal</option>
        <option value="receptionist">Receptionist</option>
      </select>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={6} className="w-full border p-2" />
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-sky-600 text-white rounded" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
      </div>
    </form>
  )
}
