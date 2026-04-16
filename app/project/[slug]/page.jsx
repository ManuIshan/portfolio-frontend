"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import CustomGallery from "@/src/component/CustomGallery";
import ContactHero from "@/components/ContactHero";
import "./ProjectDetail.css";

// Motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } }
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

// Inline project dataset
const projects = [
  {
    slug: "gym-guide",
    name: "Gym Guide",
    category: "Health & Fitness",
    short_description: "A responsive platform for fitness guidance.",
    client: "Techolas Technologies",
    date: "2025-03-15",
    year: 2025,
    main_image: "/gm.jpg",
    gallery: [
      { image: "/g1.jpg" },
      { image: "/g2.jpg" },
     { image: "/g3.jpg" },

    ],
    hosted_link: "https://github.com/ManuIshan/Gym-guide-app",
    final_title: "Scalable Fitness Solution",
    final_description:
      "This fitness platform offers access to a wide range of exercises and tutorials, providing enhanced motivation and support to help users achieve their goals. Built with strong technical expertise in HTML, CSS, JavaScript, Python Django, and MySQL, the system was developed using PyCharm and optimized for Windows 8 or above. A thorough system analysis ensured operational efficiency, user‑friendly design, cost‑effectiveness, and high performance. Looking ahead, future innovations include AR/VR integration for immersive workouts, advanced analytics for personalized insights, and gamification to make fitness engaging and rewarding.",
  },
  {
    slug: "artist",
    name: "Artist",
    category: "Editorial",
    short_description: "Editorial workflow management system.Beatiful User experience designs",
    client: "Techolas Technologies",
    date: "2025-09-10",
    year: 2025,
    main_image: "/am.png",
    gallery: [
      { image: "/a1.png" },
      { image: "/a2.png" },
      { image: "/a3.png" },
    ],
    hosted_link: "https://github.com/ManuIshan/Artist",
    final_title: "Streamlined Editorial Workflow With React",
    final_description:
      "This editorial platform project showcases a modern dark‑theme interface designed for an engaging reading experience. It features an editorial showcase with category tags, dynamic writer pages, reusable components, and a fixed responsive navbar, all optimized for smooth performance across devices. Through building it, you gained valuable lessons in scalable UI development, dynamic routing, and combining Material‑UI with Bootstrap for design flexibility. The project reflects real‑world editorial needs and sets the stage for future innovations like AR/VR integration, advanced analytics, and gamification, with plans to evolve into a full‑stack MERN application for authentic content management.",
  },
  {
    slug: "speako",
    name: "Speako",
    category: "Edutech",
    short_description: "A modern,minimal Education platform for seamless interaction.",
    client: "Techolas Technologies",
    date: "2026-02-11",
    year: 2026,
    main_image: "/2.jpeg",
    gallery: [
      { image: "/1.png" },
      { image: "/3.jpeg" },
      { image: "/4.png" },
    ],
    hosted_link: "https://github.com/ManuIshan/Speako-backend",
    final_title: "Enhanced Communication Experience",
    final_description:
      "Speako is a modern full‑stack E‑Learning Platform built with React and Django REST Framework, designed to deliver a secure and structured online learning experience. It enables users to explore categorized courses, request enrollment, access approved materials, leave reviews, and track progress through personalized dashboards, while administrators manage courses, users, and enrollments via a custom React‑based admin panel. Featuring JWT authentication, dynamic routing, responsive UI, and a decoupled RESTful architecture, Speako demonstrates scalable API‑driven design and real‑world application of full‑stack development skills.",
  },
  {
    slug: "hajj-haven",
    name: "Hajj Haven",
    category: "Travel & Hospitality",
    short_description: "Next.js builded holy pilgrimage guide with seamless user experience.",
    client: "Local Entrepreneur",
    date: "2026-03-02",
    year: 2026,
    main_image: "/hm.png",
    gallery: [
      { image: "/h1.png" },
      { image: "/h2.png" },
      { image: "/h3.png" },
      { image: "/h4.png" },
    ],
    hosted_link: "https://hajjhaven.vercel.app/",
    final_title: "Seamless Shopping Experience",
    final_description:
      "I recently built a responsive and modern web interface using Next.js and React, focusing on clean UI design and smooth user experience. The project leverages component‑based architecture, structured page routing, and a consistent dark‑themed layout created with React Bootstrap and custom CSS. To enhance interactivity, I integrated Framer Motion for animations and React Icons for a sleek visual style. Deployed seamlessly on Vercel with GitHub version control, this project reflects my ability to craft scalable, user‑centric applications with dynamic routing and performance‑optimized design.",
  },
];

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());

  if (!project) return <div className="pd-loading">Project not found.</div>;

  const galleryItems = project.gallery.map((img, idx) => ({ id: idx, img: img.image }));

  return (
    <main className="pd-page">
      {/* Hero */}
      <section className="pd-hero">
        <motion.p className="pd-hero-label" variants={fadeUp} initial="hidden" animate="show">
          / {project.category}
        </motion.p>
        <motion.h1 className="pd-hero-title" variants={fadeUp} initial="hidden" animate="show">
          {project.name}
        </motion.h1>
        <motion.p className="pd-hero-desc" variants={fadeUp} initial="hidden" animate="show">
          {project.short_description}
        </motion.p>
      </section>

      {/* Main Image */}
      <motion.section className="pd-main-img-wrap" variants={fadeIn} initial="hidden" whileInView="show">
        <img src={project.main_image} alt={project.name} className="pd-main-img" />
      </motion.section>

      {/* Overview */}
      <motion.section className="pd-overview" variants={stagger} initial="hidden" whileInView="show">
        <motion.div className="pd-section-header" variants={fadeUp}>
          <span className="pd-section-label">/ OVERVIEW</span>
          <span className="pd-section-num">N. 01</span>
        </motion.div>
        <div className="pd-overview-body">
          <motion.p className="pd-overview-text" variants={fadeUp}>
            {project.short_description}
          </motion.p>
          <motion.div className="pd-meta-rows" variants={stagger}>
            <motion.div className="pd-meta-row" variants={fadeUp}>
              <span className="pd-meta-key">Client</span>
              <span className="pd-meta-val">{project.client}</span>
            </motion.div>
            <motion.div className="pd-meta-row" variants={fadeUp}>
              <span className="pd-meta-key">Date</span>
              <span className="pd-meta-val">
                {new Date(project.date).toLocaleDateString("en-GB", {
                  day: "2-digit", month: "short", year: "numeric"
                })}
              </span>
            </motion.div>
            <motion.div className="pd-meta-row" variants={fadeUp}>
              <span className="pd-meta-key">Category</span>
              <span className="pd-meta-val">{project.category}</span>
            </motion.div>
            {project.hosted_link && (
              <motion.div className="pd-meta-row" variants={fadeUp}>
                <span className="pd-meta-key">Live</span>
                <a href={project.hosted_link} target="_blank" rel="noopener noreferrer" className="pd-meta-link">
                  View Site →
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Final Result */}
      <motion.section className="pd-final" variants={stagger} initial="hidden" whileInView="show">
        <motion.div className="pd-section-header" variants={fadeUp}>
          <span className="pd-section-label">FINAL RESULT</span>
          <span className="pd-section-num">N. 02</span>
        </motion.div>
        <div className="pd-final-body">
          <motion.h2 className="pd-final-title" variants={fadeUp}>
            {project.final_title}
          </motion.h2>
          <motion.p className="pd-final-desc" variants={fadeUp}>
            {project.final_description}
          </motion.p>
        </div>
      </motion.section>

      {/* Gallery */}
      {galleryItems.length > 0 && (
        <motion.section className="pd-gallery" variants={fadeIn} initial="hidden" whileInView="show">
          <motion.div className="pd-section-header" variants={fadeUp}>
            <span className="pd-section-label">/ GALLERY</span>
            <span className="pd-section-num">N. 03</span>
          </motion.div>
          <div className="pd-gallery-wrap">
            <CustomGallery items={galleryItems} />
          </div>
          <ContactHero />
        </motion.section>
      )}
    </main>
  );
}
