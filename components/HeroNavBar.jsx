"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlowingMenu from "@/src/component/FlowingMenu";
import "./hero.css";

const menuItems = [
  { text: "HOME",     link: "/",          ariaLabel: "Go to home"    },
  { text: "ABOUT",    link: "/about",     ariaLabel: "About me"      },
  { text: "PROJECTS", link: "/projects", ariaLabel: "View projects" },
  { text: "CONTACT",  link: "/contact",   ariaLabel: "Contact me"    },
];

const navbarVariants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function PlusToggler({ open, onClick }) {
  return (
    <button
      className={`hero-toggler ${open ? "is-open" : ""}`}
      onClick={onClick}
      aria-label="Toggle navigation"
    >
      <span className="ht-bar ht-h" />
      <span className="ht-bar ht-v" />
    </button>
  );
}

export default function HeroNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      className="hero-navbar bg-transparent"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="nav-logo">Ishan©</div>

      <PlusToggler open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="hero-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="hero-menu-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <FlowingMenu
                items={menuItems}
                onItemClick={() => setMenuOpen(false)}
                textColor="#fff"
                bgColor="transparent"
                marqueeBgColor="#111"
                marqueeTextColor="#fff"
                borderColor="rgba(255,255,255,0.08)"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}