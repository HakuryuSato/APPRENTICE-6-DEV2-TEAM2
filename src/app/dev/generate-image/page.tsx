"use client";

import React, { useState } from "react";
import { fetchGenerateImage } from "@/utils/client/apiClient";
import { GeneratedImage } from "@/components/game/GeneratedImage";

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = async () => {
    try {
      const result = await fetchGenerateImage(prompt);
      if (result && result.url) {
        setImageUrl(result.url);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>OpenAI Image Generator</h1>
      <div>
        <input
          type="text"
          placeholder="プロンプトを入力"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleGenerate}>生成</button>
      </div>

      {imageUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p>生成された画像:</p>
          <img src={imageUrl} alt="Generated by OpenAI" />
        </div>
      )}

      <GeneratedImage imageUrl="https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
  );
}
