"use client";

import { useEffect, useRef, useState } from "react";
import ShinyText from "@/src/component/ShinyText";
import "./HomeHero2.css";


function RevealText({ children }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const start = wh * 0.9;
      const end = wh * 0.15;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = children.split(" ");
  const total = words.length;

  return (
    <span ref={ref}>
      {words.map((word, i) => {
        const wp = Math.min(1, Math.max(0, progress * total - i));
        return (
          <span
            key={i}
            style={{
              color: `rgba(255,255,255,${0.1 + wp * 0.8})`,
              transition: "color 0.12s ease",
            }}
          >
            {word}{i < total - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}


function Counter({ target, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTs = null;
          const duration = 1600;
          const step = (ts) => {
            if (!startTs) startTs = ts;
            const pct = Math.min((ts - startTs) / duration, 1);
            const eased = 1 - Math.pow(1 - pct, 3);
            setCount(Math.floor(eased * target));
            if (pct < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}


export default function HomeHero2() {
  return (
    <section className="hh2">

      {/* / ABOUT ————————————————— N. 01 */}
      <div className="hh2-topbar">
        <span className="hh2-about">/ About</span>
        <span className="hh2-num">N. 01</span>
      </div>

      {/* 3-col grid */}
      <div className="hh2-grid">

        {/* Row 1 col 1 — Photo */}
        <div className="hh2-photo">
          <img src="/hero1.jpg" alt="Profile" />
        </div>

        <div className="hh2-headline-wrap">
          <h2 className="hh2-headline">
            <RevealText>
              I'm a passionate Full Stack Developer shaping impactful digital products from Kerala.
            </RevealText>
          </h2>

          <div className="hh2-shiny-wrap">
            <ShinyText
              text="Full Stack Developer · Web Design · Strategy · Creative Technologist"
              speed={3}
              color="rgba(255,255,255,0.5)"
              shineColor="#ffffff"
              spread={100}
              disabled={false}
            />
          </div>
        </div>

        <div className="hh2-spacer" />

        <div className="hh2-stat-gap" />

        <div className="hh2-stat-1">
          <span className="hh2-stat-num">
            <Counter target={1} suffix="+" />
          </span>
          <p className="hh2-stat-title">Experience</p>
          <p className="hh2-stat-sub">Deliver with excellence</p>
        </div>

        <div className="hh2-stat-2">
          <span className="hh2-stat-num">
            <Counter target={10} suffix="+" />
          </span>
          <p className="hh2-stat-title">Completed</p>
          <p className="hh2-stat-sub">Projects that speak</p>
        </div>

      </div>

    </section>
  );
}