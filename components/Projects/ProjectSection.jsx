"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TiltedCard from "@/src/component/TiltedCard";
import StarBorder from "@/src/component/StarBorder";
import { API_URL } from "@/lib/api";
import "./ProjectSection.css";

function RevealText({ children }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect  = el.getBoundingClientRect();
      const wh    = window.innerHeight;
      const start = wh * 0.9;
      const end   = wh * 0.15;
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

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res  = await fetch(`${API_URL}projects/?show_in_home=true`);
        const data = await res.json();
        setProjects(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchProjects();
  }, []);

  if (projects.length === 0) return <section className="ps-section" />;

  return (
    <section className="ps-section">

      <div className="ps-top">
        <span className="ps-label">/ PROJECTS</span>
                <span className="ps-label">N. 02</span>

      </div>

      <div className="ps-headline">
        <h2>
          <RevealText>
            Crafting visuals that move people from brand identity to motion every project is built with intention and precision
          </RevealText>
        </h2>
      </div>

      <div className="ps-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="ps-card-wrap"
onClick={() => router.push(`/project/${project.slug.toLowerCase()}`)}          >
            <TiltedCard
              imageSrc={project.cover_image}
              altText={project.name}
              captionText={project.name}
              containerWidth="100%"
              containerHeight="100%"
              imageWidth="100%"
              imageHeight="100%"
              scaleOnHover={1.05}
              rotateAmplitude={10}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={false}
            />
            <div className="ps-card-meta">
              <span className="ps-card-title">{project.name}</span>
              <span className="ps-card-year">/{project.year}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="ps-explore-wrap">
        <StarBorder
          as="button"
          color="white"
          speed="3s"
          className="ps-star-btn"
          onClick={() => router.push("/projects")}
        >
          Explore All →
        </StarBorder>
      </div>

    </section>
  );
}