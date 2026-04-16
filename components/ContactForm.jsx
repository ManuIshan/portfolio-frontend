"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "./ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: responseData.message || "Message sent! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorMessage =
          responseData.detail ||
          responseData.errors?.message?.[0] ||
          "Failed to send message. Please try again.";
        setStatus({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message: `Network error: ${error.message}. Make sure the backend server is running at http://127.0.0.1:8000`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
        {/* Heading */}
        <motion.div
          className="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="contact-title">Let's talk</h1>
          <p className="contact-subtitle">
            Reach out — let's create something exceptional, clear, and meaningful together.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label">Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email*</label>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label className="form-label">Message*</label>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="form-textarea"
              rows="8"
            />
          </div>

          {/* Status Message */}
          {status && (
            <motion.div
              className={`status-message ${status.type}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {status.message}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="contact-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
