"use client"
import styles from "./page.module.css";
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import NavigationBar from "@/components/00_NavigationBar/navigationBar";
import Header from "@/components/01_Header/header";
import Services from "@/components/02_Services/services";
import Numbers from "@/components/03_NumbersandTestimonials/numbers";
import CasesHeadline from "@/components/04_Cases/casesHeadline";
import Cases from "@/components/04_Cases/cases";
import Team from "@/components/05_Team/team";
import Creativity from "@/components/06_Creativity/creativity";
import Contact from "@/components/07_Contact/contact";
import Footer from "@/components/08_Footer/footer";
import FinalBar from "@/components/09_FinalBar/finalBar";
import NumbersAndTestimonials from "@/components/03_NumbersandTestimonials/numbersAndTestimonials";
import CasesOverview from "@/components/04_Cases/casesOverview";
import CasesOverviewNew from "@/components/04_Cases/casesOverviewNew";




export default function Home() {
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
  const [headerHeight, setHeaderHeight] = useState(0);
  const [servicesHeight, setServicesHeight] = useState(0);
  const [numbersHeight, setNumbersHeight] = useState(0);
  const [casesHeadlineHeight, setCasesHeadlineHeight] = useState(0);
  const [casesOverviewHeight, setCasesOverviewHeight] = useState(0);
  const [casesHeight, setCasesHeight] = useState(0);
  const [teamHeight, setTeamHeight] = useState(0);
  const [creativityHeight, setCreativityHeight] = useState(0);
  const [contactHeight, setContactHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  //Smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    
    window.lenis = lenis; // Make it globally available

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (headerRef.current && servicesRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const servicesHeight = servicesRef.current.offsetHeight;
      const numbersHeight = numbersRef.current.offsetHeight;
      const casesHeadlineHeight = casesHeadlineRef.current.offsetHeight;
      const casesOverviewHeight = casesOverviewRef.current.offsetHeight;
      const casesHeight = casesRef.current.offsetHeight;
      const teamHeight = teamRef.current.offsetHeight;
      const creativityHeight = creativityRef.current.offsetHeight;
      const contactHeight = contactRef.current.offsetHeight;
      const footerHeight = footerRef.current.offsetHeight;

      // Debugging: Log each height
      console.log('Header Height:', headerHeight);
      console.log('Services Height:', servicesHeight);
      console.log('Numbers Height:', numbersHeight);
      console.log('Cases Headline Height:', casesHeadlineHeight);
      console.log('Cases Overview Height:', casesOverviewHeight);
      console.log('Cases Height:', casesHeight);
      console.log('Team Height:', teamHeight);
      console.log('Creativity Height:', creativityHeight);
      console.log('Contact Height:', contactHeight);
      console.log('Footer Height:', footerHeight);


      setHeaderHeight(headerHeight);
      setServicesHeight(servicesHeight);
      setNumbersHeight(numbersHeight);
      setCasesHeadlineHeight(casesHeadlineHeight);
      setCasesOverviewHeight(casesOverviewHeight);
      setCasesHeight(casesHeight);
      setTeamHeight(teamHeight);
      setCreativityHeight(creativityHeight);
      setContactHeight(contactHeight);
      setFooterHeight(footerHeight);

      // Adjust calculation if necessary

      setTotalHeight(
        headerHeight + 
        servicesHeight + 
        (numbersHeight - (40 * window.innerHeight / 100)) + 
        casesHeadlineHeight + 
        (casesOverviewHeight - (40 * window.innerHeight / 100)) + 
        casesHeight + 
        teamHeight + 
        creativityHeight + 
        contactHeight + 
        footerHeight
      );
    }
  }, []);

  // For Header: Start animation when it becomes sticky
  const { scrollYProgress: headerScrollYProgress } = useScroll({
    target: containerRef,
    offset: [`${headerHeight}px end`, `${headerHeight * 1.5}px start`]
  });

  const { scrollYProgress: servicesScrollYProgress } = useScroll({
    target: containerRef,
    offset: [`${headerHeight + servicesHeight}px end`, `${headerHeight + servicesHeight}px start`]
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

  // Transformations
  const headerY = useTransform(headerScrollYProgress, [0, 1], [0, 100]); 
  const servicesY = useTransform(servicesScrollYProgress, [0, 1], [0, 400]); 
  const numbersY = useTransform(numbersScrollYProgress, [0, 1], [0, 400]); 
  const casesHeadlineY = useTransform(casesHeadlineScrollYProgress, [0, 1], [0, -900]); 
  const casesY = useTransform(casesScrollProgress, [0, 1], [0, 400]); 
  const teamY = useTransform(teamScrollYProgress, [0, 1], [0, 400]); 

  const scaleHeader = useTransform(headerScrollYProgress, [0, 1], [1, 0.6]);
  const rotateHeader = useTransform(headerScrollYProgress, [0, 1], [0, -6]);
  const opacityHeader = useTransform(headerScrollYProgress, [0, 1], [1, 0]);
  const opacityServices = useTransform(servicesOpacityScrollProgress, [0, 1], [1, 0]);
  const opacityNumbers = useTransform(numbersScrollYProgress, [0, 1], [1, 0.7]);
  const opacityCasesOverview = useTransform(casesOverviewOpacityScrollProgress, [0, 1], [1, 0]);
  const opacityCases = useTransform(casesScrollProgress, [0, 1], [1, 0.7]);


  useEffect(() => {
    const unsubscribe = casesScrollProgress.onChange((value) => {
      console.log('casesScrollProgress:', value);
    });
  
    return () => unsubscribe();
  }, [casesScrollProgress]);
  
  useEffect(() => {
    const unsubscribe = casesY.onChange((value) => {
      console.log('casesY:', value);
    });
  
    return () => unsubscribe();
  }, [casesY]);




  return (
    <div>
      <NavigationBar />

      <div 
        ref={containerRef}
        className={styles.parallaxContainer}
        style={{ height: `${totalHeight}px` }}
      >

        {/****** Header ******/}
        <motion.div
          ref={headerRef}
          className={styles.headerContainer}
          id="header"
          style={{ 
            top: `calc(100vh - ${headerHeight}px)`, 
            scale: scaleHeader, 
            rotate: rotateHeader, 
            opacity: opacityHeader,
            y: headerY
            }}
        >
          <Header />
        </motion.div>
      
        {/****** Services ******/}
        <motion.div 
          id="services"
          ref={servicesRef}
          className={styles.servicesContainer}
          style={{ 
            // top: `calc(100vh - ${servicesHeight}px)`, 
            y: servicesY,
            opacity: opacityServices
          }}
        >
          <Services />
        </motion.div>
        
        {/****** Numbers and Testimonials ******/}
        <motion.div 
          ref={numbersRef} 
          className={styles.numbersContainer}
          style={{ 
            y: numbersY,
            opacity: opacityNumbers
          }}
        >
          <NumbersAndTestimonials />
        </motion.div>

        {/****** Case Studies ******/}
        <motion.div 
          id="cases"
          ref={casesHeadlineRef}
          className={styles.casesHeadlineContainer}
          style={{ 
            y: casesHeadlineY
          }}
        >
          <CasesHeadline />
        </motion.div>

        <motion.div 
          ref={casesOverviewRef}
          className={styles.casesOverviewContainer}
          style={{ 
            top: `calc(100vh - ${casesOverviewHeight}px)`,
            opacity: opacityCasesOverview
          }}
        >
          <CasesOverviewNew />
        </motion.div>

        <motion.div 
          ref={casesRef}
          className={styles.casesContainer}
          style={{ 
            y: casesY,
            opacity: opacityCases
          }}
        >
          <Cases />
        </motion.div>


        {/****** Team ******/}
        <motion.div 
          id="team"
          ref={teamRef}
          className={styles.teamContainer}
          style={{ 
            y: teamY
           }}
        >
          <Team />
        </motion.div>

        <div 
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
        </div>
        
        <div id="footer" 
          ref={footerRef}
          className={styles.footerContainer}
        >
          <Footer />
        </div>
        <FinalBar />
      </div>
    </div>
  );
}
