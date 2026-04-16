"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TiltedCard from "@/src/component/TiltedCard";
import StarBorder from "@/src/component/StarBorder";
import "./ProjectSection.css";

// Scroll reveal text component
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

// Project dataset
const projects = [
  {
    id: 1,
    name: "Gym Guide",
    year: 2025,
    slug: "gym-guide",
    cover_image: "/gymguide.png",
  },
  {
    id: 2,
    name: "Artist",
    year: 2026,
    slug: "artist",
    cover_image: "/artist.png",
  },
  {
    id: 3,
    name: "Speako",
    year: 2026,
    slug: "speako",
    cover_image: "/speako.png",
  },
  {
    id: 4,
    name: "Hajj Haven",
    year: 2026,
    slug: "hajj-haven",
    cover_image: "/hajjhaven.png",
  },
];

export default function ProjectsSection() {
  const router = useRouter();

  return (
    <section className="ps-section">
      <div className="ps-top">
        <span className="ps-label">/ PROJECTS</span>
        <span className="ps-label">N. 04</span>
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
            onClick={() => router.push(`/project/${project.slug}`)}
          >
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
