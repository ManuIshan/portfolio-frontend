"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css"; 

const menuItems = [
  { label: "Home",     link: "/",          ariaLabel: "Go to home"    },
  { label: "About",    link: "/about",    ariaLabel: "About me"      },
  { label: "Projects", link: "/#projects", ariaLabel: "View projects" },
  { label: "Contact",  link: "/#contact",  ariaLabel: "Contact me"    },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <Link href="/" className="nav-logo">Ishan©</Link>

        <button
          className={`nav-toggler ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon">+</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="full-screen-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            <nav className="menu-nav">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.link}
                    aria-label={item.ariaLabel}
                    className="menu-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}