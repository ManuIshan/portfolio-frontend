"use client";

import Link from "next/link";
import LiquidChrome from "@/src/component/LiquidChrome";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ft-footer">

      {/* top divider */}
      <div className="ft-top-bar" />

      <div className="ft-hero">

        {/* top row over hero */}
        <div className="ft-top-row">

          <div className="ft-left">
            <a href="tel:+917736620996" className="ft-phone">+91 7736620996</a>
          </div>

          <nav className="ft-center">
            <Link href="/"         className="ft-nav-link">Home</Link>
                        <Link href="/about"  className="ft-nav-link">About</Link>

            <Link href="/projects" className="ft-nav-link">Projects</Link>
            <Link href="/contact"  className="ft-nav-link">Contact</Link>
          </nav>

          <div className="ft-right">
            <a href="https://github.com/ManuIshan" target="_blank" rel="noopener noreferrer" className="ft-social-link">REPO</a>
            <a href="https://www.linkedin.com/in/manuishan22?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="ft-social-link">LINKEDIN</a>
            <a href="https://www.instagram.com/manuishn.in" target="_blank" rel="noopener noreferrer" className="ft-social-link">INSTA</a>
          </div>

        </div>

      
        <LiquidChrome
          className="ft-liquidchrome"
    baseColor={[0.1, 0.1, 0.1]}
          speed={0.18}
          amplitude={0.24}
          frequencyX={3}
          frequencyY={3}
          interactive={true}
        />

        {/* layer 3 — name */}
        <div className="ft-name-wrap">
          <span className="ft-copy">©2025</span>
          <h2 className="ft-name">Ishan<span>©</span></h2>
        </div>

      </div>

    </footer>
  );
}