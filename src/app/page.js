"use client"
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Lenis from 'lenis';

import NavigationBar from "@/components/00_NavigationBar/navigationBar";


import styles from "./page.module.css";



export default function Home() {

  // Device Types
  const isMobile = useMediaQuery({ maxWidth: 768 });

  /****** States ******/
  // Ref States
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const servicesRef = useRef(null);
  const numbersRef = useRef(null);
  const casesHeadlineRef = useRef(null);
  const casesOverviewRef = useRef(null);
  const casesRef = useRef(null);
  const teamRef = useRef(null);
  const creativityRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  // Height States
  const [heights, setHeights] = useState([]);
  const [totalHeight, setTotalHeight] = useState(0);


  /****** Smooth Scrolling ******/
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);


  /****** Heights ******/
  useEffect(() => {
    const calculateHeights = () => {
      const newHeights = [
        headerRef, servicesRef, numbersRef, casesHeadlineRef, casesOverviewRef,
        casesRef, teamRef, creativityRef, contactRef, footerRef
      ].map((ref) => ref.current?.offsetHeight || 0);

      // Apply adjustments for numbersHeight and casesOverviewHeight
      const adjustedHeights = [
        newHeights[0], // headerHeight
        newHeights[1], // servicesHeight
        isMobile ? newHeights[2] : newHeights[2] - (40 * window.innerHeight / 100), // numbersHeight adjustment
        newHeights[3], // casesHeadlineHeight
        isMobile ? newHeights[4] : newHeights[4] - (40 * window.innerHeight / 100), // casesOverviewHeight adjustment
        newHeights[5], // casesHeight
        newHeights[6], // teamHeight
        newHeights[7], // creativityHeight
        newHeights[8], // contactHeight
        newHeights[9]  // footerHeight
      ];

      console.log('Header height:', adjustedHeights[0]);

      const total = adjustedHeights.reduce((sum, height) => sum + height, 0);
      setHeights(adjustedHeights);
      setTotalHeight(total);
    };


    calculateHeights();
    window.addEventListener('resize', calculateHeights);

    return () => window.removeEventListener('resize', calculateHeights);
  }, [isMobile]);


  return (
    <div>
      <div> Hallo </div>
      <NavigationBar />


      <div 
          id="contact"
          ref={contactRef}
          className={styles.contactContainer}
        >
          <div>
            hallo
            Halloho
          </div>
      </div>
      
    </div>
  );
}
