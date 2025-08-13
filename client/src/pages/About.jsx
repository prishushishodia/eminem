"use client";

import React, { useEffect, useRef, Suspense, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import your assets
import LalitBG from "../assets/image/LalitBG.webp";
import globe from "../assets/image/trial.png";
import UtkarshBG from "../assets/image/UtkarshBG.webp";
import teamImage from "../assets/image/team.jpg";

// --- Placeholder Components & Assets ---
const Footer = () => (
  <footer className="relative z-20 bg-gray-800 text-center p-4">
    <p className="text-gray-400">&copy; 2025 Techkrate. All Rights Reserved.</p>
  </footer>
);
const FontAwesomeIcon = ({ icon }) => (
  <i className={`fab ${icon.iconName}`}></i>
);
const faLinkedinIn = { iconName: "fa-linkedin-in" };
const bgVid = "https://videos.pexels.com/video-files/857032/857032-hd_1280_720_25fps.mp4";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 3D Model Component - Loads the GLB file
const Model = React.forwardRef((props, ref) => {
  const { scene } = useGLTF("/model/twoWheel.glb");
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const newColor = new THREE.Color("#145CCF");
        const newMaterial = new THREE.MeshStandardMaterial({
          color: newColor,
          metalness: 1,
          roughness: 0.3,
        });
        child.material = newMaterial;
      }
    });
  }, [scene]);
  return <primitive object={scene} {...props} ref={ref} />;
});

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

// This component contains the 3D scene and the GSAP animation logic.
const Scene = () => {
  const modelRef = useRef();
  const timeline = useRef();
  const sceneGroupRef = useRef();

  useLayoutEffect(() => {
    if (modelRef.current) {
      timeline.current = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      timeline.current.to(modelRef.current.scale, { x: 30, y: 30, z: 30 }, 0);
      timeline.current.to(modelRef.current.position, { z: 5 }, 0);
      timeline.current.to(sceneGroupRef.current.rotation, { y: Math.PI }, 0);
    }
  }, [modelRef.current]);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[-0.5, 2, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <group ref={sceneGroupRef}>
          <Model
            ref={modelRef}
            position={[2000, -350, 0]}
            scale={[9, 9, 1.2]}
          />
        </group>
      </Suspense>
    </Canvas>
  );
};

// The main component, now named AboutUs
const AboutUs = () => {
  const headerRef = useRef(null);
  const charterRef = useRef(null);
  const ceoRef = useRef(null);
  const cooRef = useRef(null);
  const teamHeaderRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const teamImageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const st = ScrollTrigger.create({
      trigger: ".scroll-container",
      start: "bottom bottom",
      onEnter: () =>
        gsap.to(canvasContainerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
        }),
      onLeaveBack: () =>
        gsap.to(canvasContainerRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.in",
        }),
    });

    // Parallax effect for the team image, applied to both top and bottom
    const teamParallax = gsap.timeline({
      scrollTrigger: {
        trigger: teamImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    teamParallax.to(teamImageRef.current, { y: "-20%", ease: "none" });

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

    fadeInAnimation(headerRef.current);
    fadeInAnimation(charterRef.current);
    fadeInAnimation(teamHeaderRef.current);

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

    return () => {
      st.kill();
      teamParallax.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans">
      {/* Hero section with 3D model */}
      <div
        ref={canvasContainerRef}
        className="fixed top-0 left-0 w-full h-screen z-0"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
          autoPlay
          loop
          muted
          playsInline
          src={bgVid}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        <Scene />
        <div className="absolute top-1/2 left-20 transform -translate-y-1/2 z-10 text-left p-4 max-w-sm sm:max-w-md">
         <h2 className="text-7xl font-Helix text-white mb-40 whitespace-nowrap">
What does <span className="text-blue-600">Techkrate</span> do?
</h2>

          
        
        </div>
          <p className="text-lg right-10 z-20 text-white"  >
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
      </div>

      {/* Reduced scroll container height */}
      <div className="scroll-container h-[110vh]"></div>

      {/* About Us section */}
      <div className="relative z-10 bg-black">
        <div
          ref={headerRef}
          className="flex flex-col-reverse md:flex-row items-start px-4 sm:px-6 md:px-16 py-16 sm:py-24 max-w-6xl mx-auto text-white"
        >
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
              className="absolute right-[-35%] top-[calc(100%+250px)]  transform -translate-y-1/2 w-[120%]"
            />
          </div>
        </div>
      </div>

      {/* The new parallax image section */}
      <div ref={teamImageRef} className="w-screen h-screen relative overflow-hidden z-10">
        <img
          src={teamImage}
          alt="Team"
          className="absolute bottom-0 left-0 w-full h-[180%] object-cover object-center"
        />
      </div>

      <div className="relative z-20 bg-white text-zinc-900">
      <div
  ref={charterRef}
  className="relative w-full py-20 sm:py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto"
>
  {/* Heading */}
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

  {/* Cards */}
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


        {/* Leading Techkrate section */}
        <div className="w-full pt-16 mb-0 bg-black">
          <div
            ref={teamHeaderRef}
            className="text-center px-4 sm:px-6 md:px-16 text-white"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16">
              LEADING TECHKRATE
            </h2>
          </div>
          <div
            ref={ceoRef}
            className="grid lg:grid-cols-2 w-full items-stretch"
          >
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
          <div
            ref={cooRef}
            className="grid lg:grid-cols-2 w-full items-stretch"
          >
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
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;