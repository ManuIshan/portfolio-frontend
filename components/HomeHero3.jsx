"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TrueFocus from "@/src/component/TrueFocus";
import LogoLoop from "@/src/component/LogoLoop";
import { API_URL } from "@/lib/api";
import "./HomeHero3.css";

import {
  FaGithub, FaReact, FaPython, FaJs, FaBootstrap,
  FaCss3Alt, FaHtml5
} from "react-icons/fa";

import {
  SiNextdotjs, SiDjango, SiPostgresql, SiMysql,
  SiTailwindcss, SiVercel, SiPostman
} from "react-icons/si";

/* ───────── Reveal Text ───────── */
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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = children.split(" ");
  const total = words.length;

  return (
    <span ref={ref}>
      {words.map((word, i) => {
        const wp = Math.min(1, Math.max(0, progress * total - i));
        return (
          <span key={i} style={{ color: `rgba(255,255,255,${0.1 + wp * 0.85})`, transition: "0.2s" }}>
            {word}{" "}
          </span>
        );
      })}
    </span>
  );
}

const services = [
  {
    num: "01",
    title: "Frontend Development",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
        <path d="M4 24 Q14 8 24 24 Q34 40 44 24" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
        <path d="M4 24 Q14 40 24 24 Q34 8 44 24" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Backend Development",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <polyline points="8,14 24,6 40,14 40,34 24,42 8,34 8,14" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.7"/>
        <polyline points="8,14 24,22 40,14" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
        <line x1="24" y1="22" x2="24" y2="42" stroke="white" strokeWidth="2" opacity="0.7"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Web Hosting",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="10" width="36" height="10" rx="2" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
        <rect x="6" y="28" width="36" height="10" rx="2" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
        <circle cx="38" cy="15" r="2" fill="white" opacity="0.7"/>
        <circle cx="38" cy="33" r="2" fill="white" opacity="0.7"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Web Designing",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <polygon points="24,4 44,44 4,44" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.7"/>
        <line x1="24" y1="4" x2="24" y2="44" stroke="white" strokeWidth="2" opacity="0.7"/>
        <line x1="4" y1="44" x2="44" y2="44" stroke="white" strokeWidth="2" opacity="0.7"/>
      </svg>
    ),
  },
];

const logos = [
  { node: <FaGithub /> },
  { node: <FaReact /> },
  { node: <SiNextdotjs /> },
  { node: <FaPython /> },
  { node: <FaJs /> },
  { node: <FaBootstrap /> },
  { node: <SiDjango /> },
  { node: <SiPostgresql /> },
  { node: <SiMysql /> },
  { node: <SiTailwindcss /> },
  { node: <SiVercel /> },
  { node: <FaCss3Alt /> },
  { node: <FaHtml5 /> },
  { node: <SiPostman /> },
];

/* ───────── Main ───────── */
export default function HomeHero3() {
  const [cv, setCv] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}cv/`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setCv(data[0]); })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="hh3">
      <div className="hh3-content">

        {/* TOP */}
        <motion.div className="hh3-topbar">
          <span>/ EXPERTISE</span>
          <span>N. 03</span>
        </motion.div>

        {/* HEADING */}
        <div className="hh3-headline">
          <h2>
            <RevealText>
              Professional services I offer to help you achieve meaningful and lasting results
            </RevealText>
          </h2>
        </div>

        {/* CARDS */}
        <div className="hh3-grid">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="hh3-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <div className="hh3-card-top">
                <div className="hh3-card-icon">{s.icon}</div>
                <span className="hh3-card-bignum">{s.num}</span>
              </div>

              {/* bottom: title + divider */}
              <div className="hh3-card-bottom">
                <p className="hh3-card-title">{s.title}</p>
                <div className="hh3-card-foot">
                  <span className="hh3-card-num">/{s.num}</span>
                  <span className="hh3-card-plus">+</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOGO LOOP */}
        <div className="hh3-logo-wrapper">
          <LogoLoop
            logos={logos}
            speed={80}
            gap={40}
            logoHeight={28}
            pauseOnHover={true}
            scaleOnHover={true}
          />
        </div>

        {/* CV BUTTON */}
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

      </div>
    </section>
  );
}