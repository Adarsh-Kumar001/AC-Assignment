'use client';

import { useEffect, useState } from 'react';


export default function CallList() {
    const [calls, setCalls] = useState<any[]>([]);


    async function load() {
        const res = await fetch('/api/calls');
        setCalls(await res.json());
    }


    useEffect(() => { load(); }, []);


    return (
        <div className="space-y-4">
            {calls.map(c => (
                <div key={c.id} className="bg-white p-4 rounded shadow">
                    <div className="font-bold">Call ID: {c.id}</div>
                    <div className="text-sm">Time: {c.timestamp}</div>
                    <div className="text-sm">Duration: {c.duration}</div>
                    <div className="mt-2 text-gray-700">Transcript: {c.transcript}</div>
                    {c.function_results && <pre className="bg-gray-100 mt-2 p-2 text-xs rounded">{JSON.stringify(c.function_results, null, 2)}</pre>}
                </div>
            ))}
        </div>
    );
}