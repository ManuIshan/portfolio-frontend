"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import CustomGallery from "@/src/component/CustomGallery";
import "./ProjectDetail.css";
import ContactHero from "@/components/ContactHero";
import { API_URL } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } }
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } }
};

export default function ProjectDetailPage() {
  const { slug }                 = useParams();
  const [project, setProject]    = useState(null);
  const [loading, setLoading]    = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function fetchProject() {
      try {
        const res  = await fetch(`${API_URL}projects/${slug.toLowerCase()}/`)
        const data = await res.json();
        setProject(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) return (
    <div className="pd-loading">
      <span className="pd-loading-dot" />
    </div>
  );
  if (!project) return <div className="pd-loading">Project not found.</div>;

  const galleryItems = project.gallery && project.gallery.length > 0
    ? project.gallery.map((img, idx) => ({
        id: idx,
        img: img.image
      }))
    : [];

  return (
    <main className="pd-page">

     
      <section className="pd-hero">
        <motion.p
          className="pd-hero-label"
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ delay: 0.1 }}
        >
          / {project.category}
        </motion.p>

        <motion.h1
          className="pd-hero-title"
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ delay: 0.2 }}
        >
          {project.name}
        </motion.h1>

        <motion.p
          className="pd-hero-desc"
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ delay: 0.35 }}
        >
          
          {project.short_description}
        </motion.p>
      </section>

      <motion.section
        className="pd-main-img-wrap"
        variants={fadeIn} initial="hidden"
        whileInView="show" viewport={{ once: true, margin: "-10%" }}
      >
        <img src={project.main_image} alt={project.name} className="pd-main-img" />
      </motion.section>

      <motion.section
        className="pd-overview"
        variants={stagger} initial="hidden"
        whileInView="show" viewport={{ once: true, margin: "-10%" }}
      >
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
                <a
                  href={project.hosted_link}
                  target="_blank" rel="noopener noreferrer"
                  className="pd-meta-link"
                >
                  View Site →
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="pd-final"
        variants={stagger} initial="hidden"
        whileInView="show" viewport={{ once: true, margin: "-10%" }}
      >
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

      {galleryItems.length > 0 && (
        <motion.section
          className="pd-gallery"
          variants={fadeIn} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: "-5%" }}
        >
          <motion.div className="pd-section-header" variants={fadeUp}>
            <span className="pd-section-label">/ GALLERY</span>
            <span className="pd-section-num">N. 03</span>
          </motion.div>
          <div className="pd-gallery-wrap">
            <CustomGallery items={galleryItems} />
          </div>
          <ContactHero/>
          
        </motion.section>
      )}

    </main>
  );
}