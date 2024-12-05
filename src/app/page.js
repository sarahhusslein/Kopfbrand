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
  const [headerHeight, setHeaderHeight] = useState(0);
  const [servicesHeight, setServicesHeight] = useState(0);
  const [numbersHeight, setNumbersHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current && servicesRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const servicesHeight = servicesRef.current.offsetHeight;
      const numbersHeight = numbersRef.current.offsetHeight;
      
      setHeaderHeight(headerHeight);
      setServicesHeight(servicesHeight);
      setNumbersHeight(numbersHeight);
      setTotalHeight(headerHeight + servicesHeight + numbersHeight);
    }
  }, []);

  // For Header: Start animation when it becomes sticky
  const { scrollYProgress: headerScrollYProgress } = useScroll({
    target: containerRef,
    offset: [`${headerHeight}px end`, `${headerHeight}px start`]
  });

  const { scrollYProgress: servicesScrollYProgress } = useScroll({
    target: containerRef,
    offset: [`${headerHeight + servicesHeight}px end`, `${headerHeight + servicesHeight}px start`]
  });

  const scaleHeader = useTransform(headerScrollYProgress, [0, 1], [1, 0.8]);
  const rotateHeader = useTransform(headerScrollYProgress, [0, 1], [0, -3]);
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
          style={{ top: `calc(100vh - ${headerHeight}px)`, scale: scaleHeader, rotate: rotateHeader }}
        >
          <Header />
        </motion.div>
        <motion.div 
          ref={servicesRef}
          className={styles.servicesContainer}
          style={{ top: `calc(100vh - ${servicesHeight}px)`, scale: scaleServices, rotate: rotateServices }}
        >
          <Services />
        </motion.div>
        <div ref={numbersRef} className={styles.numbersContainer}>
          <NumbersAndTestimonials />
        </div>
      </div>
      {/* <main className={styles.main}>
        <section id="services">
          <Services />
        </section>
        <Numbers />
        <Testimonials />
        <section id="cases">
          <CasesHeadline />
          <CasesOverview />
          <CasesNew />
        </section>
        <section id="team">
          <Team />
        </section>
        <Creativity />
        <section id="contact">
          <Contact />
        </section>
        <section id="footer">
          <Footer />
        </section>
        <FinalBar />
      </main> */}
    </div>
  );
}
