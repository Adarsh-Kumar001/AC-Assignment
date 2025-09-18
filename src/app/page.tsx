"use client";

import BotForm from '@/components/BotForm';
import BotList from '@/components/BotList';

import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <BotForm onCreated={() => router.refresh()} />
      <BotList />
    </div>
  );
}