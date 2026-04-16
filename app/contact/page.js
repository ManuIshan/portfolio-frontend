"use client";
import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const GradualBlur = dynamic(
  () => import("@/src/component/GradualBlur"),
  { ssr: false }
);

export default function Contact() {
  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
      <GradualBlur
        position="top"
        target="page"
        height="2rem"
        strength={2.5}
        divCount={6}
        curve="ease-out"
        zIndex={999}
        opacity={1}
      />

      <GradualBlur
        position="bottom"
        target="page"
        height="3rem"
        strength={2.5}
        divCount={6}
        curve="ease-out"
        zIndex={999}
        opacity={1}
      />

      <ContactForm />
      <Footer />
    </main>
  );
}
