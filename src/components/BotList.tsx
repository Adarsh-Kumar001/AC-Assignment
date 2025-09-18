'use client';

import { useEffect, useState } from 'react';

export default function BotList() {
  const [bots, setBots] = useState<any[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    load();
  }, []);

  async function load() {
    const res = await fetch('/api/bots');
    setBots(await res.json());
  }

  async function handleDelete(id: string) {
    await fetch(`/api/bots/${id}`, { method: 'DELETE' });
    load();
  }

  if (!hydrated) {
    // Avoid mismatch by not rendering until after hydration
    return <p className="text-gray-400">Loading bots...</p>;
  }

  return (
    <div className="mt-4 space-y-2">
      {bots.map(bot => (
        <div key={bot.id} className="flex justify-between bg-gray-50 p-2 rounded shadow">
          <div>
            <div className="font-bold">{bot.name}</div>
            <div className="text-sm text-gray-600">Domain: {bot.domain}</div>
            <div className="text-xs text-gray-400">ID: {bot.id}</div>
          </div>
          <button onClick={() => handleDelete(bot.id)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
