"use client";
import dynamic from 'next/dynamic';
import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import SVG from 'react-inlinesvg';
import styles from './services.module.css';
import serviceAnimation from '/public/animations/service.json';  
import konzeptionAnimaton from '/public/animations/konzeption.json';
import contentcreationAnimation from '/public/animations/contentcreation.json';
import prototypingAnimation from '/public/animations/prototyping.json';
import versandAnimation from '/public/animations/versand.json';



/***************************** 
Type Declarations and Arrays
*****************************/
// 🟢 Types for the services
interface Service {
    id: number;
    animation: any; 
    number: string;
    title: string;
    description: string;
    paddingTop: number;
}

// 🟢 Services array
const services: Service[] = [
  {
      id: 1,
      animation: serviceAnimation,
      number: "01",
      title: "Strategie &\nBeratung",
      description: "Gemeinsam mit Ihnen definieren wir Ziele und erarbeiten Marketingmaßnahmen, die speziell an die Bedürfnisse und Möglichkeiten Ihrer Marke geknüpft sind. Darauf aufbauend erarbeiten wir individuelle Lösungen und kreative Strategien, die Ihre Marke nicht nur definieren, sondern auch differenzieren.",
      paddingTop: 20,
  },
  {
      id: 2,
      animation: konzeptionAnimaton,
      number: "02",
      title: "Konzeption &\nKreation",
      description: "Ein gutes Projekt braucht ein noch besseres Konzept. Unsere Expertise reicht von der tiefgreifenden Analyse bis zur kreativen Umsetzung, stets mit dem Ziel, Ihre Marke nach vorne zu bringen. Unsere Kernkompetenzen liegen im Bereich Print, Corporate- und Packaging-Design.",
      paddingTop: 80,
  },
  {
      id: 3,
      animation: contentcreationAnimation,
      number: "03",
      title: "Content Creation & Social Media",
      description: "Wir platzieren Ihre Marke dort, wo sie von der richtigen Zielgruppe gesehen wird. Wir verstehen Online Marketing als die Kunst, digitale Präsenzen effektiv zu nutzen. Social Media wird mit uns zu einem mutigen, kreativen Spielfeld, auf dem Ihre Marke nicht nur gesehen, sondern wirklich erlebt wird.",
      paddingTop: 25,
  },
  {
      id: 4,
      animation: prototypingAnimation,
      number: "04",
      title: "Prototyping &\nProduktion",
      description: "In der Prototyping Phase nehmen wir Ihre Vision in die Hand und gestalten erste Entwürfe, die zum Leben erwachen. Das ermöglicht uns, Design und Funktionalität frühzeitig zu evaluieren, bevor wir in die finale Produktion gehen. Wir beraten zu Materialien, Veredelungen, Drucktechniken, Qualität und Auflagezahlen.",
      paddingTop: 40,
  },
  {
      id: 5,
      animation: versandAnimation,
      number: "05",
      title: "Lagerung &\nVersand",
      description: "Hand in Hand mit der Produktion geht unser internes Warenmanagement. Die KOPFBRAND Manufaktur (unsere Produktions- und Lagerräume) bietet die Möglichkeit Produktionen auflagenstark und kosteneffizient zu realisieren. Durch Einlagerung können wir auch zusätzlich auf spontane Bestellungen reagieren. Darüber hinaus realisieren wir den nationalen und internationalen Versand Ihrer Produkte.",
      paddingTop: 45,
  },

];

// 🟢 Lottie component
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });



export default function Services() {

    /***************************** 
     State Declarations
    *****************************/
    // 🟢 States, Refs and Device Types  
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isLargeDesktop = useMediaQuery({ minWidth: 1920 });
    const [activeIndex, setActiveIndex] = useState<number>(isMobile ? 0 : 2); 
    const servicesRef = useRef<HTMLDivElement | null>(null);
    const tiltRef = React.useRef(null);


    /***************************** 
    Animations
    *****************************/
    // 🟢 Animation constants
    const DURATION = 0.3;
    const STAGGER = 0.02;
    const itemAnimation = {
        initial: { y: 40, opacity: 0 },
        inView: {
            y: 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                ease: "easeInOut",
                duration: 1
            }
        }
    };  

    // 🟢 Animation for mobile
    const itemAnimationMobile = {
        initial: { y: 40, opacity: 0 },
        inView: {
            y: 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                ease: "easeInOut",
                duration: 1
            }
        }
    };


    // 🟢 Scroll progress for initial movement
    const { scrollYProgress: initialProgress } = useScroll({
        target: servicesRef,
        offset: ["start end", "start 10vh"]
    });

    // 🟢 Scroll progress for final alignment
    const { scrollYProgress: finalProgress } = useScroll({
        target: servicesRef,
        offset: ["start 10vh", "end 70vh"]
    });


    // 🟢 Y positions for services
    const serviceY = [
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 230 + (20 - 230) * i;  // First phase: 230 -> 20
                return 20 + (10 - 20) * f;  // Second phase: 20 -> 10
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 230 + (80 - 230) * i;  // First phase: 230 -> 80
                return 80 + (10 - 80) * f;  // Second phase: 80 -> 10
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 230 + (25 - 230) * i;  // First phase: 230 -> 25
                return 25 + (10 - 25) * f;  // Second phase: 25 -> 10
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 230 + (40 - 230) * i;  // First phase: 230 -> 40
                return 40 + (10 - 40) * f;  // Second phase: 40 -> 10
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 230 + (45 - 230) * i;  // First phase: 230 -> 45
                return 45 + (10 - 45) * f;  // Second phase: 45 -> 10
            }
        ),
    ];

    // 🟢 Y positions for large desktop
    const serviceYLargeDesktop = [
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 300 + (20 - 300) * i;  
                return 20 + (10 - 20) * f;  
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 300 + (100 - 300) * i;  
                return 100 + (10 - 100) * f;  
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 300 + (25 - 300) * i;  
                return 25 + (10 - 25) * f;  
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 300 + (50 - 300) * i; 
                return 50 + (10 - 50) * f;  
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]: [number, number]) => {
                if (i < 1) return 300 + (70 - 300) * i; 
                return 70 + (10 - 70) * f;  
            }
        ),
    ];



  /***************************** 
  Render
  *****************************/       
  return (
    <div className={styles.container}>

        {/****** Title ******/}
        <motion.div
            variants={isMobile ? itemAnimationMobile : itemAnimation}
            initial="initial"
            whileInView="inView"
            viewport={{ once: false, amount: 0.2 }}
        >
            {isMobile ? (
                    <motion.h1 className={`h1 ${styles.h1}`} variants={itemAnimationMobile}>
                        <span>KREATIV</span>
                        <br />
                        <span>AGENTUR</span>
                    </motion.h1>
                ) : (
                    <motion.h1 
                        className={`h1 ${styles.h1Wrapper}`}
                        initial="initial"
                        whileHover="hovered"
                    >
                        <div className={`h1 ${styles.h1}`}>
                            {Array.from("KREATIVAGENTUR").map((letter, i) => (
                                <motion.span 
                                    key={i}
                                    variants={{
                                        initial: { y: 0 },
                                        hovered: { y: "-100%" },
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * i,
                                    }}
                                    style={{
                                        display: "inline-block",
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                        <div
                            className={`h1 ${styles.h1}`}
                            style={{
                                position: "absolute",
                                inset: 0,
                            }}>
                            {Array.from("KREATIVAGENTUR").map((letter, i) => (
                                <motion.span 
                                    key={i}
                                    variants={{
                                        initial: { y: "100%" },
                                        hovered: { y: 0 },
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * i,
                                    }}
                                    style={{
                                        display: "inline-block",
                                        color: "#E4003E", 
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </motion.h1>
                )}


            {/****** Subtitle ******/}
            <motion.h4 className={`subtitle ${styles.h4}`} variants={isMobile ? itemAnimationMobile : itemAnimation}>
                Seit 2007 gestaltet die Münchner Kreativagentur KOPFBRAND Markenidentitäten und Kampagnen. Unser kreatives Team verbindet brandheiße Ideen mit Know-how, um maßgeschneiderte Lösungen zu schaffen. Lassen Sie uns Ihre Vision realisieren - nach dem Motto: "Immer eins mehr!" 
                {/* {isMobile ? ' ' : <br />}
                Entdecke unsere Services. */}
            </motion.h4>


            {/****** Services ******/}
            <motion.div 
                ref={servicesRef}
                className={styles.servicesWrapper}
            >
                {isMobile ? (
                    <>
                        <motion.div className={styles.buttonRow} variants={itemAnimationMobile}>
                            {services.map((service, index) => (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`${styles.button} ${index === activeIndex ? styles.active : ''}`}
                                >
                                    <span className={`subtitle-highlighted ${styles.numberMobile}`}>{service.number}</span>
                                </button>
                            ))}
                        </motion.div>
                        <motion.div className={styles.serviceSection} variants={itemAnimationMobile}>
                            <motion.div className={styles.animationContainer} >
                            <Lottie 
                                    animationData={services[activeIndex].animation}
                                    className={styles.drawingAnimation}
                                    loop={true}
                                    autoplay={true}
                                />
                            </motion.div>
                            <motion.div className={styles.textContent} variants={itemAnimationMobile}>
                                <h3 className={`subtitle-highlighted ${styles.serviceTitle}`}>{services[activeIndex].title}</h3>
                                <p className={`body ${styles.description}`}>{services[activeIndex].description}</p>
                            </motion.div>
                        </motion.div>
                    </>
                ) : (
                    services.map((service, index) => (
                        <React.Fragment key={service.id}>
                            <SVG aria-label="Divider" src="/illustrations/divider.svg" className={styles.divider} />
                            <motion.div 
                                className={`${styles.serviceSection} ${index === activeIndex ? styles.hover : ''}`}
                                style={{ 
                                    y: isLargeDesktop ? serviceYLargeDesktop[index] : serviceY[index],  
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(2)}
                            >
                                <Tilt 
                                    tiltMaxAngleX={15} 
                                    tiltMaxAngleY={15} 
                                    glareEnable={true} 
                                    transitionSpeed={1000}
                                    transitionEasing='cubic-bezier(0.1, 1, 0.1, 1)'
                                >
                                    <div className={styles.animationContainer} ref={tiltRef}>
                                    <Lottie 
                                            animationData={service.animation}
                                            className={styles.drawingAnimation}
                                            loop={true}
                                            autoplay={true}
                                        />
                                    </div>
                                </Tilt>
                                <div className={styles.textContent}>
                                    <span className={`numbers ${styles.number}`}>{service.number}</span>
                                    <h3 className={`subtitle-highlighted ${styles.serviceTitle}`}>
                                    {service.title.includes('\n')
                                        ? service.title.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                            {line}
                                            <br />
                                            </React.Fragment>
                                        ))
                                        : service.title}
                                    </h3>
                                    <p className={`body ${styles.description}`}>{service.description}</p>
                                </div>
                            </motion.div>
                        </React.Fragment>
                    ))
                )}
            </motion.div>
        </motion.div>
    </div>
  );
}



