"use client"
import styles from "./page.module.css";
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavigationBar from "@/components/00_NavigationBar/navigationBar";
import Header from "@/components/01_Header/header";
import Services from "@/components/02_Services/services";
import Numbers from "@/components/03_NumbersandTestimonials/numbers";
import CasesHeadline from "@/components/04_Cases/casesHeadline";
import Cases from "@/components/04_Cases/cases";
import CasesNew from "@/components/04_Cases/casesNew";
import Team from "@/components/05_Team/team";
import Creativity from "@/components/06_Creativity/creativity";
import Contact from "@/components/07_Contact/contact";
import Footer from "@/components/08_Footer/footer";
import FinalBar from "@/components/09_FinalBar/finalBar";
import CasesOverview from "@/components/04_Cases/casesOverview";
import NumbersAndTestimonials from "@/components/03_NumbersandTestimonials/numbersAndTestimonials";




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
      setTotalHeight(headerHeight + servicesHeight + numbersHeight + casesHeadlineHeight + casesOverviewHeight + casesHeight + teamHeight + creativityHeight + contactHeight + footerHeight);
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

  // Add a transform for Y position
  const headerY = useTransform(headerScrollYProgress, [0, 1], [0, 100]); // Header moves down slower
  const servicesY = useTransform(servicesScrollYProgress, [0, 1], [0, -200]); // Services move up faster

  const scaleHeader = useTransform(headerScrollYProgress, [0, 1], [1, 0.6]);
  const rotateHeader = useTransform(headerScrollYProgress, [0, 1], [0, -6]);
  const opacityHeader = useTransform(headerScrollYProgress, [0, 1], [1, 0]);
  const scaleServices = useTransform(servicesScrollYProgress, [0, 1], [1, 1]);
  const rotateServices = useTransform(servicesScrollYProgress, [0, 1], [0, 0]);


  return (
    <div>
      <NavigationBar />
        <div 
          ref={containerRef}
          className={styles.parallaxContainer}
          style={{ height: `${totalHeight}px` }}
        >
          <motion.div
            ref={headerRef}
            className={styles.headerContainer}
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
        
          <motion.div 
            id="services"
            ref={servicesRef}
            className={styles.servicesContainer}
            style={{ 
              top: `calc(100vh - ${servicesHeight}px)`, 
              scale: scaleServices, 
              rotate: rotateServices,
              y: servicesY
            }}
          >
            <Services />
          </motion.div>
          <div 
            ref={numbersRef} 
            className={styles.numbersContainer}
            style={{ top: `calc(100vh - ${numbersHeight}px)` }}
          >
            <NumbersAndTestimonials />
          </div>
          <div 
            id="cases"
            ref={casesHeadlineRef}
            className={styles.casesHeadlineContainer}
            // style={{ top: `calc(100vh - ${casesHeadlineHeight}px)` }}
          >
            <CasesHeadline />
          </div>
          <div 
            ref={casesOverviewRef}
            className={styles.casesOverviewContainer}
            style={{ top: `calc(100vh - ${casesOverviewHeight}px)` }}
          >
            <CasesOverview />
          </div>
          <div 
            ref={casesRef}
            className={styles.casesContainer}
          >
            <CasesNew />
          </div>
          <div 
            id="team"
            ref={teamRef}
            className={styles.teamContainer}
            style={{ top: `calc(100vh - ${teamHeight}px)` }}
          >
            <Team />
          </div>
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
