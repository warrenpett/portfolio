'use client'

import React, { useEffect, useRef, useState } from 'react';
import styles from './AnimatedText.module.css';

export default function AnimatedText({ text }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(-1);
  const words = text.split(' ');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startOffset = viewportHeight * 0.8;
      const endOffset = viewportHeight * 0.2;
      const progress = Math.min(1, Math.max(-1, (startOffset - rect.top) / (startOffset - endOffset)));
      
      // Reset progress to -1 when at the top of the page
      if (window.scrollY === 0) {
        setScrollProgress(-1);
      } else {
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={textRef} className={styles.text}>
        {words.map((word, index) => {
          const wordProgress = Math.min(1, Math.max(0, (scrollProgress * words.length) - index));
          return (
            <span
              key={index}
              className={styles.word}
              style={{
                opacity: wordProgress,
                transform: `translateY(${(1 - wordProgress) * 20}px)`,
                visibility: scrollProgress >= 0 ? 'visible' : 'hidden',
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease'
              }}
            >
              {word}
              {index < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
} 