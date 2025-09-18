'use client';

import { useState } from 'react';


export default function BotForm({ onCreated }: { onCreated: () => void }) {
    const [name, setName] = useState('');
    const [domain, setDomain] = useState('medical');
    const [prompt, setPrompt] = useState('');


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await fetch('/api/bots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, domain, prompt })
        });
        setName(''); setPrompt('');
        onCreated();
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded-xl shadow">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Bot name" className="border p-2 w-full" />
            <select value={domain} onChange={e => setDomain(e.target.value)} className="border p-2 w-full">
                <option value="medical">Medical</option>
                <option value="legal">Legal</option>
                <option value="receptionist">Receptionist</option>
            </select>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Agent prompt" className="border p-2 w-full" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Bot</button>
        </form>
    );
}