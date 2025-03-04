"use client";

import { useState, useEffect } from 'react';

interface DynamicTypeEffectProps {
className?:string;
  fixedText?: string;
  dynamicText: string[];
  typingSpeed?: number;    // ms per character when typing
  deletingSpeed?: number;  // ms per character when deleting
  pauseTime?: number;      // ms pause before switching phases
}

const TypeEffect: React.FC<DynamicTypeEffectProps> = ({
    className,
  fixedText,
  dynamicText,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseTime = 1000,
}) => {
  // Current text displayed for the dynamic part
  const [displayedDynamic, setDisplayedDynamic] = useState<string>('');
  // Phase can be 'typing' or 'deleting'
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');
  // Current character index for the current dynamic text
  const [charIndex, setCharIndex] = useState<number>(0);
  // Index to track which text in the array is currently used
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = dynamicText[currentTextIndex];

    if (phase === 'typing') {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedDynamic(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Pause then switch to deleting phase
        timeout = setTimeout(() => {
          setPhase('deleting');
        }, pauseTime);
      }
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedDynamic(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        // Switch to the next text in the array after deleting
        timeout = setTimeout(() => {
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % dynamicText.length);
          setPhase('typing');
          // charIndex is already 0
        }, pauseTime);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, phase, currentTextIndex, dynamicText, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <div className={`${className} text-2xl font-mono w-fit mx-auto`}>
      {fixedText}{' '}
      <span className="border-r-2 border-black pr-1">
        {displayedDynamic}
      </span>
    </div>
  );
};

export default TypeEffect;


{/* export syntax
    
    <DynamicTypeEffect fixedText="hello" dynamicText={["mk", "md"]} /> */}

