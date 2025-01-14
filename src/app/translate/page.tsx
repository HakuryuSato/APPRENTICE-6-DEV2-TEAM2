'use client';

import { useState } from 'react';
import { fetchTranslatePrompt } from '@/utils/client/apiClient';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [translatedPrompt, setTranslatedPrompt] = useState('');

  const handleTranslate = async () => {
    try {
      const result = await fetchTranslatePrompt(prompt);
      if (result && result.text) {
        setTranslatedPrompt(result.text);
      }
    } catch (error) {
      console.error('Error translate prompt:', error);
    }
  };

  return (
    // 使用例です
    <div>
      <h1>DeepL API</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="テキストを入力して"
      />
      <button onClick={handleTranslate}>翻訳</button>
      <p>翻訳結果: {translatedPrompt}</p>
    </div>
  );
}
