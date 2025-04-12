'use client'

import Link from 'next/link';
import styles from "./page.module.css";
import React, { useEffect, useState, useRef } from 'react'
import { useTheme } from './context/ThemeContext';
import Image from 'next/image';
import logo from './icon.svg';
import AnimatedText from './components/AnimatedText/AnimatedText';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [letterSpeeds, setLetterSpeeds] = useState({ subtitleSpeeds: [] });
  const quoteRef = useRef(null);
  const heroRef = useRef(null);

  // Generate random speeds only on client side
  useEffect(() => {
    const subtitleSpeeds = Array.from("Creative Developer").map(() => Math.random() * 0.8 + 0.6);
    setLetterSpeeds({ subtitleSpeeds });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      if (quoteRef.current) {
        const rect = quoteRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / viewportHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={styles.page}>
      <nav className={`${styles.navigation} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <Image
              src={logo}
              alt="Warren Pett Logo"
              width={50}
              height={50}
              priority
              className={styles.logoImage}
            />
          </Link>
          <div className={styles.navLinks}>
            <Link href="#work" className={styles.navLink}>
              <span>Work</span>
            </Link>
            <Link href="#contact" className={styles.navLink}>
              <span>Contact</span>
            </Link>
            <button 
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <div ref={heroRef} className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Warren Pett
          </h1>
          <p className={styles.heroSubtitle}>
            {letterSpeeds.subtitleSpeeds.length > 0 && Array.from("Creative Developer").map((letter, index) => (
              <span 
                key={index}
                className={styles.heroLetter}
                style={{
                  transform: `translateY(${scrollProgress * -50 * letterSpeeds.subtitleSpeeds[index]}px)`,
                  opacity: 1 - (scrollProgress * 0.2),
                  transition: `transform ${0.4 * letterSpeeds.subtitleSpeeds[index]}s ease, opacity 0.3s ease`
                }}
              >
                {letter}
              </span>
            ))}
          </p>
        </div>

        <AnimatedText text="Jack of all trades, master of none, though oftentimes better than a master of one." />

        <section className={styles.thoughtsSection}>
          <h2 className={styles.sectionTitle}>What I Know & Think About</h2>
          <div className={styles.thoughtsGrid}>
            <div className={`${styles.thoughtItem} ${styles.bigPicture}`}>
              <div className={styles.thoughtContent}>
                <h3>Big Picture Thinking</h3>
                <p>Understanding how systems interconnect and influence each other, seeing beyond immediate challenges to the broader landscape.</p>
              </div>
            </div>
            <div className={`${styles.thoughtItem} ${styles.security}`}>
              <div className={styles.thoughtContent}>
                <h3>Security First</h3>
                <p>Prioritizing robust security measures and risk management in all aspects of development and operations.</p>
              </div>
            </div>
            <div className={`${styles.thoughtItem} ${styles.climb}`}>
              <div className={styles.thoughtContent}>
                <h3>The Climb</h3>
                <p>Recognizing that progress is a journey, not a destination, and embracing the challenges that lead to growth.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.strengthsSection}>
          <h2 className={styles.sectionTitle}>My Strengths</h2>
          <div className={styles.strengthsGrid}>
            <div className={`${styles.strengthItem} ${styles.teamwork}`}>
              <div className={styles.strengthContent}>
                <h3>Teamwork</h3>
                <p>Collaborating effectively to achieve shared goals, fostering an environment of trust and mutual respect.</p>
              </div>
            </div>
            <div className={`${styles.strengthItem} ${styles.learner}`}>
              <div className={styles.strengthContent}>
                <h3>Continuous Learner</h3>
                <p>Embracing new challenges and technologies, constantly expanding my knowledge and skill set.</p>
              </div>
            </div>
            <div className={`${styles.strengthItem} ${styles.leader}`}>
              <div className={styles.strengthContent}>
                <h3>Leadership</h3>
                <p>Guiding teams through complex projects, making informed decisions, and inspiring others to excel.</p>
              </div>
            </div>
            <div className={`${styles.strengthItem} ${styles.contributor}`}>
              <div className={styles.strengthContent}>
                <h3>Contributor</h3>
                <p>Adding value through active participation, sharing knowledge, and driving positive change.</p>
              </div>
            </div>
          </div>
        </section>

        {/* #region Expertise Section */}
        <div className={styles.expertiseSection}>
          <h2 className={styles.sectionTitle}>Who am I?</h2>
          <div className={styles.expertiseGrid}>
            <div className={styles.expertiseItem}>
              <h3 className={styles.expertiseTitle}>Developer</h3>
              <p className={styles.expertiseDescription}>
                Crafting elegant solutions to complex problems through code and creativity.
              </p>
            </div>
            <div className={styles.expertiseItem}>
              <h3 className={styles.expertiseTitle}>Automated Processes</h3>
              <p className={styles.expertiseDescription}>
                Building efficient systems that streamline workflows and boost productivity.
              </p>
            </div>
            <div className={styles.expertiseItem}>
              <h3 className={styles.expertiseTitle}>Web Applications</h3>
              <p className={styles.expertiseDescription}>
                Creating modern, responsive, and user-friendly web experiences.
              </p>
            </div>
            <div className={styles.expertiseItem}>
              <h3 className={styles.expertiseTitle}>Systems & Solutions</h3>
              <p className={styles.expertiseDescription}>
                Designing robust architectures that scale and adapt to evolving needs.
              </p>
            </div>
          </div>
        </div>
        {/* #endregion */}

        {/* #region Work Section */}
        <section className={styles.workSection}>
          <h2 className={styles.sectionTitle}>Recent work and experiments</h2>
          <div className={styles.workGrid}>
            <div className={styles.workItem}>
              <h3>Accenture</h3>
              <p className={styles.workDate}>2016 – Present</p>
              <p className={styles.workDescription}>
                Senior Lead Developer collaborating with others to develop impactful, accessible web experiences.
              </p>
            </div>
          </div>
        </section>
        {/* #endregion */}

        <section id="hobbies" className={styles.hobbiesSection}>
          <h2 className={styles.sectionTitle}>Outside of Work</h2>
          <div className={styles.hobbiesGrid}>
            <div className={styles.hobbyItem}>
              <div className={styles.hobbyImage}>
                <Image
                  src="/resources/bear.png"
                  alt="Hiking"
                  width={300}
                  height={200}
                  className={styles.hobbyImg}
                />
              </div>
              <h3>Hiking & Nature</h3>
              <p>Exploring trails and enjoying the great outdoors</p>
            </div>
            <div className={styles.hobbyItem}>
              <div className={styles.hobbyImage}>
                <Image
                  src="/resources/leaves1.png"
                  alt="Photography"
                  width={300}
                  height={200}
                  className={styles.hobbyImg}
                />
              </div>
              <h3>Photography</h3>
              <p>Capturing moments and landscapes</p>
            </div>
            <div className={styles.hobbyItem}>
              <div className={styles.hobbyImage}>
                <Image
                  src="/resources/leaves2.png"
                  alt="Reading"
                  width={300}
                  height={200}
                  className={styles.hobbyImg}
                />
              </div>
              <h3>Reading</h3>
              <p>Expanding knowledge through books</p>
            </div>
          </div>
        </section>

        {/* #region Contact Section */}  
        <section className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <div className={styles.contactGrid}>
            <a href="mailto:warrenpett1993@gmail.com" className={styles.contactItem}>
              <h3>Email</h3>
              <p>warrenpett1993@gmail.com</p>
            </a>
            <a href="https://www.linkedin.com/in/warren-pett-a5841b94" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/warren-pett-a5841b94</p>
            </a>
            <a href="https://github.com/warrenpett" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
              <h3>GitHub</h3>
              <p>github.com/warrenpett</p>
            </a>
          </div>
        </section>
        {/* #endregion */}
      </main>
    </div>
  );
}
