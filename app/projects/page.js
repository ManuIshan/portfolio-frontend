"use client";

import { useRouter } from "next/navigation";
import TiltedCard from "@/src/component/TiltedCard";
import StarBorder from "@/src/component/StarBorder";
import "@/components/Projects/ProjectSection.css";
import ContactHero from "@/components/ContactHero";
import Footer from "@/components/Footer";

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

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <main className="ps-section p-0">
      <div className="projects-page-heading">
        <h2 className="projects-heading text-white mt-5">Projects</h2>
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
          onClick={() => router.push("/")}
        >
          Back to Home →
        </StarBorder>
      </div>

      <ContactHero />
      <Footer />
    </main>
  );
}
