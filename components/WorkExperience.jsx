"use client";

import { useEffect, useRef, useState } from "react";
import "./WorkExperienceCompo2.css";

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
              color: `rgba(255,255,255,${0.1 + wp * 0.85})`,
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

function ExperienceItem({ index, role, company, period, description }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className={`we2-item ${open ? "we2-item--open" : ""}`}>
      <div className="we2-item-header" onClick={() => setOpen(!open)}>
        <div className="we2-item-left">
          <p className="we2-item-role">{role}</p>
          <p className="we2-item-company">{company}</p>
          <p className="we2-item-num">/{num}</p>
        </div>
        <div className="we2-item-right">
          <span className="we2-item-period">{period}</span>
          <span className={`we2-item-toggle ${open ? "we2-item-toggle--open" : ""}`}>+</span>
        </div>
      </div>

      {open && description && (
        <div className="we2-item-body">
          <p className="we2-item-desc">{description}</p>
        </div>
      )}
    </div>
  );
}

export default function WorkExperienceCompo2() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/experience/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setExperiences(data);
      })
      .catch(() => {
        setExperiences([
          {
            id: 1,
            role: "Full Stack Developer Internship",
            company: "Druv Entrepreneurs Hub, Kochi",
            period: "2026 Jan - April 2026",
            description: "Built and deployed end-to-end web applications using React, Next.js, Django, and REST APIs, serving clients across diverse industries.d-to-end web applications using React, Next.js, Django, and REST APIs for clients across various industries."
          },
          {
            id: 2,
            role: "Full Stack Developer Intern",
            company: "Techolas Technologies, Calicut",
            period: "2025 – 2026",
            description: "Gained hands-on experience in full-stack development, contributing to both frontend and backend enhancements."
          },
        ]);
      });
  }, []);

  return (
    <section id="experience" className="we2">

      {/* Top bar */}
      <div className="we2-topbar">
        <span className="we2-label">/ Work Experience</span>
        <span className="we2-num">N. 01</span>
      </div>

      <div className="we2-headline-wrap">
        <h2 className="we2-headline">
          <RevealText>
            My work experience building digital products for clients, teams, and users.
          </RevealText>
        </h2>
      </div>

      <div className="we2-list">
        {experiences.map((exp, i) => (
          <ExperienceItem
            key={exp.id}
            index={i}
            role={exp.role}
            company={exp.company}
            period={exp.period}
            description={exp.description}
          />
        ))}
      </div>

    </section>
  );
}