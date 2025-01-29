"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import styles from './header.module.css';
import SVG from 'react-inlinesvg';
import LogoSlider from './logoSlider';



export default function Header() {

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const videoSrc = isMobile ? '/videos/exampleVideoMobile.mov' : '/videos/exampleVideo1.mov';


    
    const handleClick = () => {
        const element = document.getElementById('services');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
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
                        <source src={videoSrc} />
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
                    <Tilt
                        tiltMaxAngleX={15} 
                        tiltMaxAngleY={15} 
                        glareEnable={true}
                        glareBorderRadius='15px'
                        transitionSpeed={1000}
                        transitionEasing='cubic-bezier(0.1, 1, 0.1, 1)'
                        scale={1.1}
                    >
                        <motion.button 
                            className={styles.button} 
                            variants={itemAnimation} 
                            onClick={handleClick}
                        >
                            <SVG src="/icons/arrowDown.svg" className={styles.arrowIcon} />
                        </motion.button>
                    </Tilt>
                </motion.div>
            </div>
            <LogoSlider />
        </div>
    );
}


