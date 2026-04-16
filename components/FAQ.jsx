"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQ.css";

const faqs = [
  {
    q: "What technologies do you use for full stack development?",
    a: "I build full stack applications using Python (Django / Django REST Framework) on the backend and React / Next.js on the frontend. For databases I use PostgreSQL and SQLite, and I deploy on platforms like Vercel, Railway, and DigitalOcean.",
  },
  {
    q: "Can you build both the frontend and backend of a project?",
    a: "Yes — I handle the complete stack. That means REST API design with Django, database modeling, authentication, and a polished React / Next.js frontend with responsive design and animations.",
  },
  {
    q: "How do you handle API integration between Django and Next.js?",
    a: "I use Django REST Framework to expose clean JSON endpoints and consume them from Next.js using fetch or axios. I also handle CORS configuration, JWT authentication, and environment-based API URLs so the integration is seamless in both development and production.",
  },
  {
    q: "How do I get started working with you?",
    a: "Reach out via the contact section with a brief description of your project — what you need, your timeline, and your budget. I'll get back to you within 24 hours to discuss next steps.",
  },
  {
    q: "Can I customize the packages you offer?",
    a: "Absolutely. Every project is scoped individually. Whether you need just a landing page, a full web app, or an ongoing development partnership, we can tailor the scope and pricing to fit your needs.",
  },
  {
    q: "How do you weigh different criteria in your process?",
    a: "I prioritise performance, maintainability, and user experience in that order. Clean code and good architecture come before aesthetics, but I never compromise on design quality — both have to work together.",
  },
  {
    q: "What is your typical project timeline?",
    a: "A simple landing page takes 3–5 days. A full web application with backend, authentication, and deployment typically takes 3–6 weeks depending on complexity. I always agree on milestones upfront so you know exactly what to expect.",
  },
  {
    q: "What is your refund policy?",
    a: "I work in milestones with partial payments, so you only pay for completed work. If you're not satisfied at any milestone, we discuss revisions before moving forward. Full refunds are available if work hasn't started yet.",
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="faq-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
    >
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="faq-q-text">{item.q}</span>
        <motion.span
          className="faq-plus"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="faq-divider" />
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="faq-section">

      {/* top bar */}
      <div className="faq-topbar">
        <span className="faq-label text-white">/FAQ</span>
        <span className="faq-num text-white">N. 04</span>
      </div>

      {/* list */}
      <div className="faq-list">
        {faqs.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </div>

    </section>
  );
}