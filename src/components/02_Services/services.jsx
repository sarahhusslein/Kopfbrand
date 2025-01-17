"use client";
import React, { useState,useRef, useEffect } from 'react';
import styles from './services.module.css';
import placeholderServiceAnimation from '/public/animations/placeholderServiceAnimation.json';  
import serviceAnimation from '/public/animations/service.json';  
import konzeptionAnimaton from '/public/animations/konzeption.json';
import contentcreationAnimation from '/public/animations/contentcreation.json';
import prototypingAnimation from '/public/animations/prototyping.json';
import versandAnimation from '/public/animations/versand.json';
import testAnimation from '/public/animations/test.json';
import SVG from 'react-inlinesvg';
import Lottie from 'lottie-react'; 
import { motion, useScroll, useTransform } from 'framer-motion';


const services = [
  {
      id: 1,
      animation: serviceAnimation,
      number: "01",
      title: "Strategie & Beratung",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 20,
  },
  {
      id: 2,
      animation: konzeptionAnimaton,
      number: "02",
      title: "Konzeption & Kreation",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 80,
  },
  {
      id: 3,
      animation: contentcreationAnimation,
      number: "03",
      title: "Digital Content Design",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 25,
  },
  {
      id: 4,
      animation: prototypingAnimation,
      number: "04",
      title: "Prototyping & Produktion",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 40,
  },
  {
      id: 5,
      animation: versandAnimation,
      number: "05",
      title: "Versand & Lagerung",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 45,
  },

];


export default function Services() {

  const [activeIndex, setActiveIndex] = useState(2); // Start with third service active

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
            duration: 0.7
        }
    }
    };  

    const servicesRef = useRef(null);

    // First phase: Initial movement to staggered positions
    const { scrollYProgress: initialProgress } = useScroll({
        target: servicesRef,
        offset: ["start end", "start 10vh"]
    });

    // Second phase: Final alignment
    const { scrollYProgress: finalProgress } = useScroll({
        target: servicesRef,
        offset: ["start 10vh", "end 70vh"]
    });

    // For debugging
    useEffect(() => {
        initialProgress.onChange(v => console.log('Initial Progress:', v));
        finalProgress.onChange(v => console.log('Final Progress:', v));
    }, [initialProgress, finalProgress]);

    const serviceY = [
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]) => {
                if (i < 1) return 200 + (20 - 200) * i;  // First phase: 200 -> 20
                return 20 + (10 - 20) * f;  // Second phase: 20 -> 10
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]) => {
                if (i < 1) return 200 + (80 - 200) * i;  // First phase: 200 -> 80
                return 80 + (10 - 80) * f;  // Second phase: 80 -> 10
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]) => {
                if (i < 1) return 200 + (25 - 200) * i;  // First phase: 200 -> 25
                return 25 + (10 - 25) * f;  // Second phase: 25 -> 10
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]) => {
                if (i < 1) return 200 + (40 - 200) * i;  // First phase: 200 -> 40
                return 40 + (10 - 40) * f;  // Second phase: 40 -> 10
            }
        ),
        useTransform(
            [initialProgress, finalProgress], 
            ([i, f]) => {
                if (i < 1) return 300 + (45 - 300) * i;  // First phase: 300 -> 45
                return 45 + (10 - 45) * f;  // Second phase: 45 -> 10
            }
        ),
    ];


  return (
    <div className={styles.container}>
        <motion.div
        variants={itemAnimation}
        initial="initial"
        whileInView="inView"
        viewport={{ once: false, amount: 0.3 }}
        >
            <motion.h1 
            className={`h1 ${styles.h1}`}
            initial="initial"
            whileHover="hovered"
        >
            <div
                variants={{
                    initial: { y: 0 },
                    hovered: { y: "-100%" },
                }}>
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
                style={{
                    position: "absolute",
                    inset: 0,
                }}
                variants={{
                    initial: { y: "100%" },
                    hovered: { y: 0 },
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

            <motion.h4 className={`subtitle ${styles.h4}`} variants={itemAnimation}>
                Wir konzipieren, gestalten, und kreieren. Von der Idee bis zum Prototyping. 
                <br />
                Lorem ipsum text.
            </motion.h4>

            <motion.div 
                ref={servicesRef}
                className={styles.servicesWrapper}
            >
                {services.map((service, index) => (
                    <React.Fragment key={service.id}>
                        <SVG src="/illustrations/divider.svg" className={styles.divider} />
                        <motion.div 
                            className={`${styles.serviceSection} ${index === activeIndex ? styles.hover : ''}`}
                            style={{ 
                                y: serviceY[index],  
                            }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(2)}
                        >
                            <div className={styles.animationContainer}>
                                <Lottie 
                                    animationData={service.animation}
                                    className={styles.drawingAnimation}
                                    loop={true}
                                    autoplay={true}
                                />
                            </div>
                            <div className={styles.textContent}>
                                <span className={`numbers ${styles.number}`}>{service.number}</span>
                                <h3 className={`subtitle-highlighted ${styles.serviceTitle}`}>{service.title}</h3>
                                <p className={`body ${styles.description}`}>{service.description}</p>
                            </div>
                        </motion.div>
                    </React.Fragment>
                ))}
            </motion.div>
        </motion.div>
    </div>
  );
}


