import React from 'react';
import { useAtom } from 'jotai';
import { gamePageModeAtom } from '../../atoms/state';
import { Prepare } from './GamePage/Prepare';
import { VoteContainer } from './GamePage/VoteContainer';
import { Generate } from './GamePage/Generate';
import { Result } from './GamePage/Result';

export const GamePage: React.FC = () => {
  const [gamePageMode] = useAtom(gamePageModeAtom);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {/* モードに応じて異なるコンポーネント表示 */}
          {gamePageMode.mode === 'prepare' && <Prepare />}
          {gamePageMode.mode === 'vote' && <VoteContainer />}
          {gamePageMode.mode === 'generate' && <Generate />}
          {gamePageMode.mode === 'result' && <Result />}
      </div>
    </>
  );
};
