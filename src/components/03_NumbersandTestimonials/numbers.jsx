"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './numbers.module.css';
import SVG from 'react-inlinesvg';
import CountUp from 'react-countup';



const numbers = [
    {
        id: 1,
        start: 6,
        keyword: "Internationale Awards",
    },
    {
        id: 2,
        start: 12,
        keyword: "Agentur-Flamingos",
    },
    {
        id: 3,
        start: 40,
        keyword: "EUR versteckte Kosten",
    },
    {
        id: 4,
        start: 18,
        keyword: "Unzufriedene Kunden",
    },
];


export default function Numbers() {

    const ref = useRef();
    const [inView, setInView] = useState(false);

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
    <div className={styles.container}>
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
                        <p className={`body ${styles.keyword}`}>{number.keyword}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    </div>
  );
}


