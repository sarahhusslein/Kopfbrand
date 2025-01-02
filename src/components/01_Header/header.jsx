"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './header.module.css';
import SVG from 'react-inlinesvg';
import LogoSlider from './logoSlider';



export default function Header() {
    const handleClick = () => {
        document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    };

    const itemAnimation = {
        initial: { y: 20, opacity: 0 },
        inView: {
            y: 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                ease: "easeInOut",
                duration: 0.7
            }
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.heroSection}>
                <div className={styles.imageWrapper}>
                    <video 
                        className={styles.heroVideo}  
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/videos/exampleVideo1.mov" />
                    </video>
                    {/* <img src="/images/heroImage.png" alt="header" className={styles.heroImage} /> */}
                    <div className={styles.overlay} />
                </div>
                <motion.div 
                className={styles.content}
                variants={itemAnimation}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true}}
                >
                    <motion.h1 className={`h1 ${styles.h1}`} variants={itemAnimation}>UNSERE KÖPFE</motion.h1>
                    <motion.h4 className={`subtitle ${styles.h4}`} variants={itemAnimation}>Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus ut similique ipsum aut neque dolorem in quia doloremque aut officia quae.</motion.h4>
                    <motion.button className={styles.button} variants={itemAnimation} onClick={handleClick}>
                        <SVG src="/icons/arrowDown.svg" className={styles.arrowIcon} />
                    </motion.button>
                </motion.div>
            </div>
            <LogoSlider />
        </div>
    );
}


