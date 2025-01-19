import React from 'react';
import { useAtom } from 'jotai';
import { gamePageModeAtom } from '../../atoms/state';
import { Prepare } from './GamePage/Prepare';
import { Generate } from './GamePage/Generate';
import { Result } from './GamePage/Result';
import { GlobalState } from '../state/GlobalState';
import { GeneratedImageContainer } from './GamePage/GeneratedImageContainer';

export const GamePage: React.FC = () => {
  const [gamePageMode] = useAtom(gamePageModeAtom);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column', // ここで縦並びに設定
        }}
      >
        <div>
          {/* モードに応じて異なるコンポーネント表示 */}
          {gamePageMode.mode === 'prepare' && <Prepare />}
          {gamePageMode.mode === 'vote' && <GeneratedImageContainer />}
          {gamePageMode.mode === 'generate' && <Generate />}
          {gamePageMode.mode === 'result' && <Result />}
        </div>
        <div
          style={{
            marginTop: '20px', // 上のコンポーネントとの間隔を追加
          }}
        >
          <GlobalState />
        </div>
      </div>
    </>
  );
};
