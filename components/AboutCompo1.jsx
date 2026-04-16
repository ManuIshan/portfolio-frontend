"use client";

import { useEffect, useRef, useState } from "react";
import TrueFocus from "@/src/component/TrueFocus";
import { API_URL } from "@/lib/api";
import "./AboutCompo1.css";

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

export default function AboutCompo1() {
  const [cv, setCv] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}cv/`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setCv(data[0]);
        else if (data && data.file) setCv(data);
      })
      .catch((err) => console.error("CV fetch failed", err));
  }, []);

  return (
    <section id="about" className="ac1">

      <div className="ac1-hero">

        {/* Name stacked center */}
        <div className="ac1-name-block">
          <h1 className="ac1-name">Manu</h1>
          <h1 className="ac1-name">Ishan</h1>
        </div>

        <div className="ac1-photo-wrap">
          <img src="/hero1.jpg" alt="Manu Ishan" className="ac1-photo" />
        </div>

      </div>

      <div className="ac1-meta-row">
        <div className="ac1-meta-left">
          <span className="ac1-meta-dot">•</span>
          <span>Based in Kerala</span>
        </div>
        <div className="ac1-meta-right">
          <span>1+ years in the game</span>
        </div>
      </div>

      <div className="ac1-tagline-wrap">
        <h2 className="ac1-tagline">
          <RevealText>
            I'm a Full Stack Developer building impactful web applications from pixel-perfect frontends to robust backend systems.
          </RevealText>
        </h2>
      </div>

      {cv && (
        <div className="hh3-cv-wrap">
          <button
            className="hh3-cv-btn"
            onClick={() => window.open(cv.file, "_blank")}
          >
            <TrueFocus
              text="View CV"
              manualMode={false}
              blurAmount={0.5}
              borderColor="rgb(255, 255, 255)"
              glowColor="rgba(255,255,255,0.2)"
            />
          </button>
        </div>
      )}

      <div className="ac1-stats">

        <div className="ac1-stat">
          <span className="ac1-stat-num"><Counter target={1} suffix="+" /></span>
          <p className="ac1-stat-title">Year of Experience</p>
          <p className="ac1-stat-sub">Deliver with excellence</p>
        </div>

        <span className="ac1-stat-plus">+</span>

        <div className="ac1-stat">
          <span className="ac1-stat-num"><Counter target={10} suffix="+" /></span>
          <p className="ac1-stat-title">Projects Completed</p>
          <p className="ac1-stat-sub">Projects that speak</p>
        </div>

        <span className="ac1-stat-plus">+</span>

        <div className="ac1-stat">
          <span className="ac1-stat-num"><Counter target={5} suffix="+" /></span>
          <p className="ac1-stat-title">Technologies Mastered</p>
          <p className="ac1-stat-sub">Full stack ready</p>
        </div>

      </div>

    </section>
  );
}