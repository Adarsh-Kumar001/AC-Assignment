"use client";

import BotForm from '@/components/BotForm';
import BotList from '@/components/BotList';
import { useState } from 'react';

export default function Page() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <BotForm onCreated={() => setRefresh(prev => !prev)} />
      </div>
      <div>
        <BotList key={refresh ? 'refresh1' : 'refresh0'} />
      </div>
    </div>
  );
}
