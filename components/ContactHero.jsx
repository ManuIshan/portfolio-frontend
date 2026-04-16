"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import RotatingText from "@/src/component/RotatingText";
import "./ContactHero.css";

function RevealText({ children, className = "" }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect  = el.getBoundingClientRect();
      const wh    = window.innerHeight;
      const start = wh * 0.95;
      const end   = wh * 0.3;
      const raw   = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = children.split(" ");
  const total = words.length;

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => {
        const wp = Math.min(1, Math.max(0, progress * total - i));
        return (
          <span
            key={i}
            style={{
              color: `rgba(255,255,255,${0.12 + wp * 0.88})`,
              transition: "color 0.1s ease",
            }}
          >
            {word}{i < total - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

export default function ContactHero() {
  return (
    <section className="ch-section">

      <div className="ch-bg" />

      {/* text */}
      <div className="ch-text">
        <h1 className="ch-title">
          <RevealText>Anything in Mind?</RevealText>
        </h1>

        <h2 className="ch-subtitle">
          <span className="ch-subtitle-static">Let's </span>
          <RotatingText
            texts={[" Talk", " Build", " Connect"]}
            mainClassName="ch-rotating"
            elementLevelClassName="ch-rotating-el"
            splitBy="characters"
            rotationInterval={2200}
            staggerDuration={0.03}
            staggerFrom="first"
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
          />
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <Link href="/contact" className="ch-btn">Let's Discuss</Link>
        </motion.div>
      </div>

      <motion.div
        className="ch-img-wrap"
        initial={{ opacity: 0, y: 100, scale: 0.93 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <img
          src="/hero1.jpg"
          alt="Let's work together"
          className="ch-img"
          draggable={false}
        />
      </motion.div>

    </section>
  );
}