'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface BgmContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
}

const BgmContext = createContext<BgmContextType | undefined>(undefined);

export const BgmProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(true); // ページ読み込み時に true に設定
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/sound/BGM_01.wav'); // BGM のファイルパス BGM_01.wav,BGM_02.wav,BGM_03.wav
    audio.loop = true; // ループ再生
    audio.volume = 0.2; // 初期音量
    audioRef.current = audio;

    // 自動再生を試みる
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true); // 再生成功時に true を維持
        console.log('BGM 再生成功');
      } catch (error) {
        console.warn('BGM の自動再生がブロックされました:', error);
        setIsPlaying(true); // 再生失敗でも状態を true に設定
      }
    };

    playAudio();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  return (
    <BgmContext.Provider value={{ isPlaying, togglePlay, setVolume }}>
      {children}
    </BgmContext.Provider>
  );
};

export const useBgm = () => {
  const context = useContext(BgmContext);
  if (!context) {
    throw new Error('useBgm must be used within a BgmProvider');
  }
  return context;
};