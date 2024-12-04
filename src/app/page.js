"use client"
import styles from "./page.module.css";
import { useEffect, useRef, useState } from 'react';
import NavigationBar from "@/components/00_NavigationBar/navigationBar";
import Header from "@/components/01_Header/header";
import Services from "@/components/02_Services/services";
import Numbers from "@/components/03_Numbers/numbers";
import Testimonials from "@/components/04_Testimonials/testimonials";
import CasesHeadline from "@/components/05_Cases/casesHeadline";
import Cases from "@/components/05_Cases/cases";
import CasesNew from "@/components/05_Cases/casesNew";
import Team from "@/components/06_Team/team";
import Creativity from "@/components/07_Creativity/creativity";
import Contact from "@/components/08_Contact/contact";
import Footer from "@/components/09_Footer/footer";
import FinalBar from "@/components/10_FinalBar/finalBar";
import CasesOverview from "@/components/05_Cases/casesOverview";
import StickyContainer from "@/components/11_Examples/stickyContainer";



export default function Home() {
  const headerRef = useRef(null);
  const servicesRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current && servicesRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const servicesHeight = servicesRef.current.offsetHeight;
      
      setHeaderHeight(headerHeight);
      setTotalHeight(headerHeight + servicesHeight);
    }
  }, []);

  return (
    <div>
      <NavigationBar />
      <div 
        className={styles.parallaxContainer}
        style={{ height: `${totalHeight}px` }}
      >
        <div
          ref={headerRef}
          className={styles.headerWrapper}
          style={{ top: `calc(100vh - ${headerHeight}px)` }}
        >
          <Header />
        </div>
        <div 
          ref={servicesRef}
          className={styles.servicesContainer}
        >
          <Services />
        </div>
      </div>
      {/* <main className={styles.main}>
        <Header />
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
