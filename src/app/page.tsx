"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';


export default function HomePage() {
  const [gameId, setGameId] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameId) {
      router.push(`/game/${gameId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Enter Game Session ID</h1>
      <input value={gameId} onChange={(e) => setGameId(e.target.value)} placeholder="Game ID" />
      <Button type="submit">Join Game</Button>
    </form>
  );
}
