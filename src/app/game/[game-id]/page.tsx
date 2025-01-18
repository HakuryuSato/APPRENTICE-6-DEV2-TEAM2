'use client';

import BgmController from '@/components/BgmController';
import { GamePage } from '@/components/game/GamePage';

export default function Page() {
  return (
    <>
      <GamePage />
      <BgmController />
    </>
  );
}
