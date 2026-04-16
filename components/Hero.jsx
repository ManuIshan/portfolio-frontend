"use client";

import { motion } from "framer-motion";
import HeroNavBar from "@/components/HeroNavBar";
import "./hero.css";
import { FiCopy } from "react-icons/fi";
const sideLeft = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } },
};

const sideRight = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } },
};

const titleContainer = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const h1Variant = {
  hidden:  { opacity: 0, y: 60, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-bg">
        <img
          src="/manu.png"
          alt=""
          className="hero-bg-img"
          draggable={false}
        />
        <div className="hero-bg-overlay" />
      </div>

      <HeroNavBar />


      <motion.div className="hero-left" variants={sideLeft} initial="hidden" animate="visible">
        <p>Web Development / <br />Strategy /</p>
      </motion.div>

   <motion.div
  className="hero-right"
  variants={sideRight}
  initial="hidden"
  animate="visible"
>
  <div className="email-box">
    <p className="email-text">manueshanchekkali@gmail.com <FiCopy
  className="copy-icon"
  onClick={() => {
    navigator.clipboard.writeText("manueshanchekkali@gmail.com");
  }}
/></p>

  </div>
</motion.div>

      <motion.div
        className="hero-title"
        variants={titleContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="intro" variants={fadeUp}>Hi, I am</motion.div>
        <motion.h1 variants={h1Variant}>Manu</motion.h1>
        <motion.div className="surname" variants={fadeUp}>Ishan</motion.div>
      </motion.div>

    </section>
  );
}