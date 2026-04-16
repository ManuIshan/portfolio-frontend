"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TiltedCard from "@/src/component/TiltedCard";
import StarBorder from "@/src/component/StarBorder";
import "@/components/Projects/ProjectSection.css";
import ContactHero from "@/components/ContactHero";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/projects/");
        const data = await res.json();
        setProjects(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <main className="ps-section">


      <div className="projects-page-heading">
        <h2 className="projects-heading text-white">Projects</h2>
      </div>

      {loading ? (
        <p style={{ color: "#fff", marginTop: "48px" }}>Loading projects…</p>
      ) : projects.length === 0 ? (
        <p style={{ color: "#fff", marginTop: "48px" }}>
          No projects found.
        </p>
      ) : (
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
      )}

      {!loading && projects.length > 0 && (
        <div className="ps-explore-wrap">
          <StarBorder
            as="button"
            color="white"
            speed="3s"
            className="ps-star-btn"
            onClick={() => router.push("/")}
          >
            Back to Home →
          </StarBorder>
        </div>
      )}
      <ContactHero />
      <Footer />
    </main>
  );
}
