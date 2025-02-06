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
