"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { SlidersHorizontal, Users, ShieldCheck, Zap } from 'lucide-react';

import Footer from "../components/Footer";
import bgVid from "/bgVid.mp4";
import LalitBG from "../assets/image/LalitBG.webp";
import UtkarshBG from "../assets/image/UtkarshBG.webp";
import SmoothScroll from "../components/SmoothScroll.jsx";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  // Refs for various sections to be animated
  const headerRef = useRef(null);
  const charterSectionRef = useRef(null);
  const teamSectionRef = useRef(null);
  const charterTitleRef = useRef(null);
  const charterIntroRef = useRef(null);
  const charterCardRefs = useRef([]);

  const charterItems = [
    {
      title: "Operational Simplification at Scale",
      description: "We specialize in abstracting complexity from mission-critical workflows, delivering streamlined and efficient solutions.",
      icon: <SlidersHorizontal />,
    },
    {
      title: "User-Centric Innovation Framework",
      description: "Our development philosophy prioritizes intuitive UX design and a deep understanding of end-user needs.",
      icon: <Users />,
    },
    {
      title: "Enterprise-Grade Reliability",
      description: "We uphold the highest standards of security, performance, and scalability, ensuring your operations are built on trust.",
      icon: <ShieldCheck />,
    },
    {
      title: "Vision-Driven Ecosystem Leadership",
      description: "As a catalyst for transformation, we lead with a visionary approach, pioneering the technologies of tomorrow.",
      icon: <Zap />,
    },
  ];

  useEffect(() => {
    // GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // --- Header Animation ---
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // --- Charter Section Title and Intro Animation ---
      const charterTl = gsap.timeline({
        scrollTrigger: {
          trigger: charterSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      charterTl.fromTo(
        [charterTitleRef.current, charterIntroRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        }
      );

      // --- Charter Cards Animation ---
      charterCardRefs.current.forEach((card) => {
        // Scroll-triggered fade-in for each card
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration:1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover animation for each card
        const cardBg = card.querySelector('.card-bg');
        const hoverTimeline = gsap.timeline({ paused: true });

        hoverTimeline.to(cardBg, {
          opacity: 1,
          duration: 0.1,
          ease: "power2.inOut",
        }).to(
          card,
          {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          },
          "<"
        );

        card.addEventListener("mouseenter", () => hoverTimeline.play());
        card.addEventListener("mouseleave", () => hoverTimeline.reverse());
      });

      // --- Team Section Animation ---
       gsap.fromTo(
        teamSectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

    });

    // Cleanup function to revert all animations
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div className="relative flex flex-col min-h-screen text-white overflow-hidden">
        <video
          className="fixed top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={bgVid} type="video/mp4" />
        </video>

        <div className="relative z-10 flex-grow py-10 sm:py-20 space-y-24 sm:space-y-32">
          {/* Header Section */}
          <header
            ref={headerRef}
            className="max-w-6xl mx-auto px-4 sm:px-6 text-center"
          >
            <h1 className="font-nike text-gray-200 tracking-wider text-3xl sm:text-4xl md:text-5xl font-bold mb-6 mt-16 sm:mt-24">
              ABOUT US
            </h1>
            <p className="text-base font-Montserrat  sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
              Your gateway to simplifying the complex. We develop software and SaaS solutions that empower individuals and businesses to navigate and thrive in an increasingly digital world. Our approach transforms intricate problems into clear, actionable tools that work for everyone.
              <br /><br />
              Imagine easily managing your business operations, scaling confidently, or solving daily challenges with absolute clarity. We don't just build software; we create tools that bridge the gap between complexity and understanding.
               <br /><br /> <p className="  text-2xl">The future is complex— <span className="font-extrabold text-gray-200">Techkrate</span>  makes it clear.</p>
            </p>
          </header>

          {/* Our Charter Section - REFACTORED */}
          <section
            ref={charterSectionRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          >
            <div className="text-center max-w-4xl mx-auto">
              <h2
                ref={charterTitleRef}
                className="font-nike text-gray-200 tracking-wider capitalize text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
              >
                OUR CHARTER
              </h2>
              <p
                ref={charterIntroRef}
                className="text-lg font-Montserrat  sm:text-xl  text-gray-400 leading-relaxed mb-12 sm:mb-16"
              >
                At Techkrate, we are not merely building software; we are architecting the next generation of SaaS solutions that empower businesses to thrive in a hyper-digital economy.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {charterItems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (charterCardRefs.current[index] = el)}
                  className="relative bg-white bg-opacity-5  rounded-xl p-6 text-center group overflow-hidden"
                  style={{ opacity: 0 }} // Initially hidden for GSAP
                >
                  <div className="card-bg absolute inset-0 bg-white opacity-0 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col items-center h-full space-y-4">
                    <div className="p-3 mb-2 rounded-full border-2 border-white group-hover:border-black transition-colors duration-300">
                      {React.cloneElement(item.icon, {
                        className: "h-6 w-6 text-white group-hover:text-black transition-colors duration-300",
                      })}
                    </div>
                    <h3 className="text-lg font-semibold font-Helix text-white group-hover:text-black transition-colors duration-300 flex-grow">
                      {item.title}
                    </h3>
                    <p className="text-sm  text-gray-400 group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Members Section */}
          <section ref={teamSectionRef} className="w-full">
             <h2 className="tracking-wider text-3xl font-nike sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">
               LEADING TECHKRATE
             </h2>
             <div className="bg-black/50">
                {/* Lalit Singh Chauhan */}
                <div className="grid lg:grid-cols-2 items-center max-w-[1920px] mx-auto">
                   <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                     <h3 className="font-Helix text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                       Lalit Singh Chauhan
                     </h3>
                     <p className="text-lg sm:text-xl font-Montserrat font-thin text-gray-400 mb-6">
                       Chief Executive Officer
                     </p>
                     <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
                       At Techkrate, we envision a future where complexity is no longer a barrier to innovation. Our mission is to empower businesses with transformative tools that enable them to navigate the digital era with confidence and clarity.
                     </p>
                     <a
                       href="https://www.linkedin.com/in/lalit-singh-chauhan-86b42425"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-white hover:text-blue-400 transition-colors w-fit"
                       aria-label="Lalit Singh Chauhan's LinkedIn Profile"
                     >
                       <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                     </a>
                   </div>
                   <div className="h-64 md:h-96 lg:h-full">
                     <img
                       src={LalitBG || "/placeholder.svg"}
                       alt="Lalit Singh Chauhan"
                       className="w-full h-full object-cover"
                     />
                   </div>
                </div>

                {/* Utkarsh Chauhan */}
                <div className="grid lg:grid-cols-2 items-center max-w-[1920px] mx-auto">
                   <div className="h-64 md:h-96 lg:h-full order-last lg:order-first">
                     <img
                       src={UtkarshBG || "/placeholder.svg"}
                       alt="Utkarsh Chauhan"
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                     <h3 className="font-Helix text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                       Utkarsh Chauhan
                     </h3>
                     <p className="text-lg font-Montserrat font-thin sm:text-xl text-gray-400 mb-6">
                       Chief Operating Officer
                     </p>
                     <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
                       Operational excellence is the backbone of innovation. Our commitment lies in bridging the gap between cutting-edge technology and seamless execution, empowering businesses to achieve their highest potential.
                     </p>
                     <a
                       href="https://www.linkedin.com/in/utkarsh-chauhan-techkrate"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-white hover:text-blue-400 transition-colors w-fit"
                       aria-label="Utkarsh Chauhan's LinkedIn Profile"
                     >
                       <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                     </a>
                   </div>
                </div>
             </div>
          </section>
        </div>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default AboutUs;
