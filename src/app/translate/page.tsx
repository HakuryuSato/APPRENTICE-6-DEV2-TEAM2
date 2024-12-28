"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [translated, setTranslated] = useState("");

  const handleTranslate = async () => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input, // 入力されたテキスト
          targetLang: "en-GB", // 翻訳先言語
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTranslated(data.text); // 翻訳結果を保存
      } else {
        console.error(data.error);
        setTranslated("Error occurred!");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setTranslated("Request failed!");
    }
  };

  return (
    <div>
      <h1>DeepL API</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="テキストを入力して"
      />
      <button onClick={handleTranslate}>翻訳</button>
      <p>翻訳結果: {translated}</p>
    </div>
  );
}
