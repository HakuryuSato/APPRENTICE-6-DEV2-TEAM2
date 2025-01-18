import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GeneratedImage } from '../GeneratedImage';
import {
  fetchGameState,
  fetchGenerateImage,
  fetchTranslatePrompt,
} from '@/utils/client/apiClient';
import { useAtom } from 'jotai';
import {
  gameIdAtom,
  gamePageModeAtom,
  promptsAtom,
  roundAtom,
  userIdAtom,
} from '@/atoms/state';
import { LoadingModal } from '@/components/LoadingModal/LoadingModal';

export const Generate: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [round] = useAtom(roundAtom);
  const [theme, setTheme] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prompts, setPrompts] = useAtom(promptsAtom);
  const [gameId] = useAtom(gameIdAtom);
  const [userId] = useAtom(userIdAtom);
  const [, setTemporaryTopGameLayoutMode] = useAtom(gamePageModeAtom);

  useEffect(() => {
    const fetchAndSetImage = async () => {
      try {
        const gameState = await fetchGameState(gameId);
        if (gameState) {
          const imageUrl = gameState.images[userId][round - 1]?.url;
          setImageUrl(imageUrl);
          setTheme(gameState.targetTheme);
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };
    fetchAndSetImage();
  }, [gameId]);
  // テーマをそのまま入れられないようにする？
  // 入力されたテキスト
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    // 10文字以内に制限
    if (value.length <= 10) {
      setInputText(value);
    }
  };

  // 画像生成ボタン
  const handleClickGenerate = async () => {
    if (!inputText.trim()) {
      alert('テキストを入力してください');
      return;
    }

    setIsLoading(true);

    try {
      const translatePrompt = await fetchTranslatePrompt(inputText.trim());
      console.log('変換済み:', translatePrompt);
      if (
        translatePrompt &&
        typeof translatePrompt === 'object' &&
        'text' in translatePrompt
      ) {
        const finalPrompt = prompts + translatePrompt.text;

        console.log('送信するプロンプト:', finalPrompt);

        const GeneratedResultImage = await fetchGenerateImage({
          gameId: gameId,
          round: round,
          userId: userId,
          prompt: finalPrompt,
        });

        setPrompts(finalPrompt);

        setImageUrl(GeneratedResultImage?.url || '');
        setIsGenerated(true);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false); // ローディング終了
    }
  };

  const handleClickNext = () => {
    setTemporaryTopGameLayoutMode({ mode: 'vote' });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 p-4">
      <LoadingModal isOpen={isLoading} />
      <p className="text-xl font-bold animate-pop-in">ROUND{round}</p>
      <div>テーマ：{theme}</div>
      {!isGenerated ? (
        <>
          <div>10文字以内で入力してください</div>
          {imageUrl && (
            <>
              <div>前回ラウンドの画像</div>
              <GeneratedImage className="w-full" url={imageUrl} />
            </>
          )}
          <Input
            value={inputText}
            onChange={handleChangeInput}
            placeholder="テキストを入力してください"
            className="w-full"
          />
          <p>{inputText.length} / 10 文字</p>

          <Button
            onClick={handleClickGenerate}
            className="w-full rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? '生成中...' : '生成する'}
          </Button>
        </>
      ) : (
        <>
          <GeneratedImage className="w-full" url={imageUrl} />
          <Button onClick={handleClickNext} className="w-full rounded-lg">
            みんなの画像を見にいこう！！
          </Button>
        </>
      )}
    </div>
  );
};
