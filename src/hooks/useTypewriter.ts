import { useState, useEffect } from 'react';
import { useCurrentFrame } from 'remotion';

interface UseTypewriterOptions {
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
  cursor?: boolean;
}

export function useTypewriter({
  text,
  startFrame = 0,
  charsPerFrame = 0.8,
  cursor = true,
}: UseTypewriterOptions) {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  const displayText = text.slice(0, charCount);
  const isTyping = charCount < text.length;
  const showCursor = cursor && (isTyping || Math.floor(frame / 15) % 2 === 0);

  return { displayText, showCursor, isComplete: !isTyping };
}
