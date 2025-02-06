"use client"
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from "./page.module.css";
import Lenis from 'lenis';
import NavigationBar from "@/components/00_NavigationBar/navigationBar";
import Header from "@/components/01_Header/header";
import Services from "@/components/02_Services/services";
import NumbersAndTestimonials from "@/components/03_NumbersandTestimonials/numbersAndTestimonials";
import CasesHeadline from "@/components/04_Cases/casesHeadline";
import CasesOverviewNew from "@/components/04_Cases/casesOverviewNew";
import Cases from "@/components/04_Cases/cases";
import Team from "@/components/05_Team/team";
import Creativity from "@/components/06_Creativity/creativity";
import Contact from "@/components/07_Contact/contact";
import Footer from "@/components/08_Footer/footer";
import FinalBar from "@/components/09_FinalBar/finalBar";




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

    if (typeof window === "undefined") return;
    
    const lenis = new Lenis({
      autoRaf: true,
    });
    
    window.lenis = lenis; 

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


  /****** Scroll Progress ******/

  // Calculate offsets based on device type
  const headerOffset = isMobile ? [`${heights[0]}px end`, `${heights[0]}px start`] : [`${heights[0]}px end`, `${heights[0] * 1.5}px start`];

  const { scrollYProgress: headerScrollYProgress } = useScroll({
    target: containerRef,
    offset: headerOffset
  });

  const { scrollYProgress: servicesScrollYProgress } = useScroll({
    target: containerRef,
    offset: [`${heights[0] + heights[1]}px end`, `${heights[0] + heights[1]}px start`]
  });

  const { scrollYProgress: servicesOpacityScrollProgress } = useScroll({
    target: numbersRef,
    offset: ["end 95vh", "end 90vh"]
  });

  const { scrollYProgress: numbersScrollYProgress } = useScroll({
    target: numbersRef,
    offset: ["end end", "end start"]
  });

  const { scrollYProgress: casesHeadlineScrollYProgress } = useScroll({
    target: casesHeadlineRef,
    offset: ["end end", "end start"]
  });

  const { scrollYProgress: casesOverviewOpacityScrollProgress } = useScroll({
    target: casesRef,
    offset: ["end end", "end 99vh"]
  });

  const { scrollYProgress: casesScrollProgress } = useScroll({
    target: casesRef,
    offset: ["end end", "end start"]
  });

  const { scrollYProgress: teamScrollYProgress } = useScroll({
    target: teamRef,
    offset: ["end end", "end start"]
  });

  const { scrollYProgress: footerScrollYProgress } = useScroll({
    target: contactRef,
    offset: ["end end", "end 50vh"]
  });


  /****** Transformations ******/
  // Y positions
  const headerY = useTransform(headerScrollYProgress, [0, 1], [0, 100]); 
  const servicesY = useTransform(servicesScrollYProgress, [0, 1], [0, 400]); 
  const numbersY = useTransform(numbersScrollYProgress, [0, 1], [0, 400]); 
  const casesHeadlineY = useTransform(casesHeadlineScrollYProgress, [0, 1], [0, -900]); 
  const casesY = useTransform(casesScrollProgress, [0, 1], [0, 400]); 
  const teamY = useTransform(teamScrollYProgress, [0, 1], [0, 400]); 

  // Scale and rotate
  const scaleHeader = useTransform(headerScrollYProgress, [0, 1], isMobile ? [1, 0.1] : [1, 0.6]);
  const rotateHeader = useTransform(headerScrollYProgress, [0, 1], [0, -6]);

  // Opacities
  const opacityHeader = useTransform(headerScrollYProgress, [0, 1], [1, 0]);
  const opacityServices = useTransform(servicesOpacityScrollProgress, [0, 1], [1, 0]);
  const opacityNumbers = useTransform(numbersScrollYProgress, [0, 1], [1, 0.7]);
  const opacityCasesOverview = useTransform(casesOverviewOpacityScrollProgress, [0, 1], [1, 0]);
  const opacityCases = useTransform(casesScrollProgress, [0, 1], [1, 0.7]);
  const opacityFooter = useTransform(footerScrollYProgress, [0, 1], [0.2, 1]);





  return (
    <div>
      <NavigationBar />

      <div 
        ref={containerRef}
        className={styles.parallaxContainer}
        style={{ height: `${totalHeight}px` }}
      >

        {/****** Header ******/}
        {/* <motion.div
          ref={headerRef}
          className={styles.headerContainer}
          id="header"
          style={{ 
            top: `calc(100vh - ${heights[0] || 0}px)`, 
            scale: scaleHeader, 
            rotate: rotateHeader, 
            opacity: opacityHeader,
            y: headerY
            }}
        >
          <Header />
        </motion.div> */}
      
        {/****** Services ******/}
        {/* <motion.div 
          id="services"
          ref={servicesRef}
          className={styles.servicesContainer}
          style={{ 
            y: servicesY,
            opacity: opacityServices
          }}
        >
          <Services />
        </motion.div> */}
        
        {/****** Numbers and Testimonials ******/}
        {/* <motion.div 
          ref={numbersRef} 
          className={styles.numbersContainer}
          style={{ 
            y: numbersY,
            opacity: opacityNumbers
          }}
        >
          <NumbersAndTestimonials />
        </motion.div> */}

        {/****** Case Studies ******/}
        {/* <motion.div 
          id="cases"
          ref={casesHeadlineRef}
          className={styles.casesHeadlineContainer}
          style={{ 
            y: casesHeadlineY
          }}
        >
          <CasesHeadline />
        </motion.div> */}

        {/* <motion.div 
          ref={casesOverviewRef}
          className={styles.casesOverviewContainer}
          style={{ 
            top: `calc(100vh - ${heights[4] || 0}px)`,
            opacity: opacityCasesOverview
          }}
        >
          <CasesOverviewNew />
        </motion.div> */}

        {/* <motion.div 
          ref={casesRef}
          className={styles.casesContainer}
          style={{ 
            y: casesY,
            opacity: opacityCases
          }}
        >
          <Cases />
        </motion.div> */}


        {/****** Team ******/}
        {/* <motion.div 
          id="team"
          ref={teamRef}
          className={styles.teamContainer}
          style={{ 
            y: teamY
           }}
        >
          <Team />
        </motion.div> */}

        {/* <div 
          ref={creativityRef}
          className={styles.creativityContainer}
        >
          <Creativity />
        </div>

        <div 
          id="contact"
          ref={contactRef}
          className={styles.contactContainer}
        >
          <Contact />
        </div> */}
        
        {/* <motion.div id="footer" 
          ref={footerRef}
          className={styles.footerContainer}
          style={{ 
            top: `calc(100vh - ${heights[9] || 0}px)`,
            marginTop: `-${heights[9] || 0}px`,
            opacity: opacityFooter
          }}
        >
          <Footer />
          <FinalBar />
        </motion.div> */}
        
      </div>
    </div>
  );
}
