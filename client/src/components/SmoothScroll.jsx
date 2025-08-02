// src/components/SmoothScroll.js
"use client";

import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const lenis = useLenis(({ scroll }) => {
    // Sync ScrollTrigger to the Lenis instance
    ScrollTrigger.update(scroll);
  });

  useEffect(() => {
    // This part is crucial for syncing GSAP with Lenis
    if (lenis) {
      const raf = (time) => {
        lenis.raf(time * 1000); // Lenis uses milliseconds, GSAP uses seconds
        ScrollTrigger.update();
      };
      
      gsap.ticker.add(raf);

      return () => {
        gsap.ticker.remove(raf);
      };
    }
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;