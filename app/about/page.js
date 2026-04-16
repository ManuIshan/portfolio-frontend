"use client";
import dynamic from "next/dynamic";
import AboutCompo1 from "@/components/AboutCompo1";
import Footer from "@/components/Footer";
import WorkExperience from "@/components/WorkExperience";
import ContactHero from "@/components/ContactHero";

const GradualBlur = dynamic(
  () => import("@/src/component/GradualBlur"),
  { ssr: false }
);
 
export default function About() {
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

      <AboutCompo1 />
      <WorkExperience />  
      <ContactHero/>  
      <Footer />
      
    </main>
  );
}