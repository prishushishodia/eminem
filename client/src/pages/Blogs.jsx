"use client";

import React, { useRef, useEffect, Suspense, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Import your assets
import globe from "../assets/image/trial.png";
import LalitBG from "../assets/image/LalitBG.webp";
import UtkarshBG from "../assets/image/UtkarshBG.webp";
import teamImage from "../assets/image/team.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Placeholder Components & Assets (defined here for a self-contained component) ---
const Footer = () => (
  <footer className="relative z-20 bg-gray-800 text-center p-4">
    <p className="text-gray-400">&copy; 2025 Techkrate. All Rights Reserved.</p>
  </footer>
);

// Mock FontAwesomeIcon
const FontAwesomeIcon = ({ icon }) => (
  <i className={`fab ${icon.iconName}`}></i>
);
const faLinkedinIn = { iconName: "fa-linkedin-in" };

// CharterItem Component for the white section
const CharterItem = ({ title, content }) => (
  <div className="group relative p-6 sm:p-8 bg-gray-100 rounded-xl transition-all duration-500 hover:bg-gray-200 hover:shadow-lg">
    <div className="flex flex-col items-center text-center space-y-4">
      <h4 className="text-lg sm:text-xl font-semibold text-zinc-900">
        {title}
      </h4>
      <p className="text-sm sm:text-base text-zinc-600">{content}</p>
    </div>
  </div>
);

// The main component, now containing all the integrated content
const Blog = () => {
  // Refs for the original sections
  const wordRef = useRef(null);
  const sectionRef = useRef(null);
  const blackOverlayRef = useRef(null);
  const newSectionRef = useRef(null);

  // Refs for the new integrated sections
  const headerRef = useRef(null);
  const charterRef = useRef(null);
  const teamImageRef = useRef(null);
  const teamHeaderRef = useRef(null);
  const ceoRef = useRef(null);
  const cooRef = useRef(null);

  useEffect(() => {
    // --- Lenis Smooth Scrolling ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1500);
    });

    // --- GSAP ScrollTrigger Animations ---

    // Timeline 1: Slow Scroll for Zoom and Initial Reveal of About Us section
    const zoomTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1200", // Increased scroll distance for slow zoom and reveal
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    zoomTl
      .to(wordRef.current, {
        scale: 34,
        ease: "power2.inOut",
        duration: 1,
      })
      .to(
        blackOverlayRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        },
        ">-0.5" // Starts just before the zoom ends
      )
      .to(
        newSectionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<" // Starts with the overlay fade
      );

    // Timeline 2: Parallax effect for the team image
    const teamParallax = gsap.timeline({
      scrollTrigger: {
        trigger: teamImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    teamParallax.to(teamImageRef.current, { y: "-50%", ease: "none" });

    // Function to create a generic fade-in animation
    const fadeInAnimation = (element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    };

    // Apply fade-in animations to the new sections
    fadeInAnimation(charterRef.current);
    fadeInAnimation(teamHeaderRef.current);

    // GSAP animation for the CEO section (slide from left)
    gsap.fromTo(
      ceoRef.current,
      { x: "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ceoRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // GSAP animation for the COO section (slide from right)
    gsap.fromTo(
      cooRef.current,
      { x: "100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cooRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Cleanup function to kill all ScrollTriggers and Lenis instance on unmount
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <div className="scroll-container overflow-hidden">
        {/* --- Section 1: The Pinned Zoom Section --- */}
        <div
          ref={sectionRef}
          className="flex justify-center items-center w-screen h-screen relative z-10"
        >
          <h1
            ref={wordRef}
            className="text-[15vw] leading-none font-black text-black"
            style={{ transformOrigin: "51.5624% 50%" }}
          >
            ENTER
          </h1>
          <div
            ref={blackOverlayRef}
            className="absolute top-0 left-0 w-full h-full bg-black z-20"
            style={{ opacity: 0 }}
          ></div>
        </div>

        {/* --- Section 2: The Integrated About Us Text Section --- */}
        <div ref={newSectionRef} className="relative z-10 bg-black translate-y-full opacity-0">
          <div ref={headerRef} className="flex flex-col-reverse md:flex-row items-start px-4 sm:px-6 md:px-16 py-16 sm:py-24 max-w-6xl mx-auto text-white">
            <div className="md:w-1/2 text-base sm:text-lg text-gray-300 leading-relaxed mt-10 md:mt-0">
              <h1 className="hidden md:block text-8xl text-white md:text-7xl font-bold mb-8 text-left">
                About Us
              </h1>
              <p>
                Your gateway to simplifying the complex. We develop software and SaaS
                solutions that empower individuals and businesses to navigate and thrive
                in an increasingly digital world. Our approach transforms intricate problems
                into clear, actionable tools that work for everyone, regardless of expertise
                or experience.
              </p>
              <p className="mt-6">
                Imagine easily managing your business operations, scaling confidently, or solving
                daily challenges with absolute clarity. Whether you're a seasoned tech professional
                or a first-time user, Techkrate ensures that the experience is intuitive, powerful,
                and adaptable to your needs.
              </p>
              <p className="mt-6">
                We don't just build software; we create tools that bridge the gap between
                complexity and understanding. The future is complex—Techkrate makes it clear.
              </p>
              <p className="mt-4">
                The future is complex —{" "}
                <span className="font-bold text-blue-500 text-xl">Techkrate</span>{" "}
                makes it clear.
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col justify-start md:pl-12 mt-10 md:mt-0 relative">
              <img
                src={globe}
                alt="Globe"
                className="absolute right-[-35%] top-[calc(100%+250px)] transform -translate-y-1/2 w-[120%]"
              />
            </div>
          </div>
        </div>
        
        {/* --- Section 3: The New Parallax Image Section --- */}
        <div ref={teamImageRef} className="w-screen h-screen relative overflow-hidden z-10">
          <img
            src={teamImage}
            alt="Team"
            className="absolute bottom-0 left-0 w-full h-[180%] object-cover object-center"
          />
        </div>

        {/* --- Section 4: Our Charter and Leadership Sections --- */}
        <div className="relative z-20 bg-white text-zinc-900">
          <div ref={charterRef} className="relative w-full py-20 sm:py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
                OUR CHARTER
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
              <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed mt-6 max-w-3xl mx-auto">
                At Techkrate, we are not merely building software; we are
                architecting the next generation of SaaS solutions that empower
                businesses to thrive in a hyper-digital economy.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <CharterItem
                  title="Operational Simplification at Scale"
                  content="We specialize in abstracting complexity..."
                />
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <CharterItem
                  title="User-Centric Innovation Framework"
                  content="Our development philosophy prioritizes intuitive UX..."
                />
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <CharterItem
                  title="Enterprise-Grade Reliability"
                  content="We uphold the highest standards of security..."
                />
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <CharterItem
                  title="Vision-Driven Ecosystem Leadership"
                  content="As a catalyst for transformation, we foster ecosystems..."
                />
              </div>
            </div>
          </div>

          <div className="w-full pt-16 mb-0 bg-black">
            <div ref={teamHeaderRef} className="text-center px-4 sm:px-6 md:px-16 text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16">
                LEADING TECHKRATE
              </h2>
            </div>
            <div ref={ceoRef} className="grid lg:grid-cols-2 w-full items-stretch">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-black text-white">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                  Lalit Singh Chauhan
                </h3>
                <p className="text-xl font-thin text-gray-500 mb-6">
                  Chief Executive Officer
                </p>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  At Techkrate, we envision a future where complexity is no longer
                  a barrier...
                </p>
                <a
                  href="https://www.linkedin.com/in/lalit-singh-chauhan-86b42425"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-500 transition-colors hover:text-[#0077B5]"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
              <div className="min-h-[400px] lg:min-h-0">
                <img
                  src={LalitBG}
                  alt="Lalit Singh Chauhan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div ref={cooRef} className="grid lg:grid-cols-2 w-full items-stretch">
              <div className="min-h-[400px] lg:min-h-0 order-2 lg:order-1">
                <img
                  src={UtkarshBG}
                  alt="Utkarsh Chauhan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-black text-white order-1 lg:order-2">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                  Utkarsh Chauhan
                </h3>
                <p className="text-xl font-thin text-gray-500 mb-6">
                  Chief Operating Officer
                </p>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  Operational excellence is the backbone of innovation...
                </p>
                <a
                  href="https://www.linkedin.com/in/utkarsh-chauhan-techkrate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-500 transition-colors hover:text-[#0077B5]"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Blog;
