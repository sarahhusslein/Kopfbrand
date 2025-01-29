"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import styles from './numbers.module.css';
import SVG from 'react-inlinesvg';
import CountUp from 'react-countup';


interface Number {
    id: number;
    start: number;
    keyword: string;
  }

const numbers: Number[] = [
    {
        id: 1,
        start: 16,
        keyword: "Internationale Awards",
    },
    {
        id: 2,
        start: 22,
        keyword: "Agentur-Flamingos",
    },
    {
        id: 3,
        start: 50,
        keyword: "EUR versteckte Kosten",
    },
    {
        id: 4,
        start: 28,
        keyword: "Unzufriedene Kunden",
    },
];


export default function Numbers() {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => setInView(entry.isIntersecting),
          { threshold: 0.1 }
        );
        if (ref.current) {
          observer.observe(ref.current);
        }
        return () => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        };
      }, []);



  return (
    <div>
      <Tilt 
        className={styles.container}
        tiltMaxAngleX={7} 
        tiltMaxAngleY={3} 
        transitionSpeed={3000}
        transitionEasing='cubic-bezier(0.1, 1, 0.1, 1)'
        glareEnable={false} 
      >
        <div className={styles.content}>
            <motion.div 
            className={styles.headline}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeInOut"}}
            >
                <h2 className={`h2 ${styles.h2}`}>
                UNSERE
                <br />
                <span className={styles.underline}> 
                    ZAHLEN
                    <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.underlineSVG}/>
                </span>
                </h2>
            </motion.div>
            <motion.div 
            className={styles.numbersRow} 
            ref={ref}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeInOut"}}
            >
                {numbers.map((number) => (
                    <div className={styles.numbersColumn} key={number.id}>
                        <p className={`numbers-small ${styles.number}`}>
                            {inView ? (
                                <CountUp
                                    start={number.start}
                                    end={0}
                                    duration={3}
                                    separator=" "
                                    useEasing
                                />
                            ) : number.start}
                        </p>
                        <p className={`${isMobile ? 'body-small' : 'body'} ${styles.keyword}`}>{number.keyword}</p>
                    </div>
                ))}
            </motion.div>
          </div>
        </Tilt>
    </div>
  );
}


