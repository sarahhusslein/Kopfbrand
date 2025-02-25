'use client'
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './casesHeadline.module.scss';
import SVG from 'react-inlinesvg';
import useMousePosition from '@/utils/useMousePosition';
import { useMediaQuery } from 'react-responsive';


export default function CasesHeadlineNew() {

    /***************************** 
    State Declarations
    *****************************/
    // 🟢 States, Refs and Device Types
    const [isHovered, setIsHovered] = useState(false);
    const [hasEnteredFromTop, setHasEnteredFromTop] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { amount: 0.6 });
    const { mousePosition, updateMousePosition } = useMousePosition();   
    const size = isHovered ? 300 : 40;
    const isMobile = useMediaQuery({ maxWidth: 768 });


    /***************************** 
    Animations
    *****************************/
    // 🟢 Effect to handle scroll progress tracking
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (isInView) {
                setHasEnteredFromTop(true);
            } else if (currentScrollY < lastScrollY) {
                // Reset when scrolling up and out of view
                setHasEnteredFromTop(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isInView, lastScrollY]);


    /***************************** 
    Render
    *****************************/
    return (
        <div 
            className={styles.container}
            onMouseMove={updateMousePosition}
        >
            {/****** Mask ******/}
            <motion.div 
                className={styles.mask} 
                animate={{
                    WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
                    WebkitMaskSize: `${size}px`
                }}
                transition={{
                    WebkitMaskPosition: { type: "tween", ease: "backOut" },
                    WebkitMaskSize: { type: "tween", ease: "backOut" }
                }}
            >
                {!isMobile && (
                    <motion.h1 
                        ref={ref}
                        className={`h1 ${styles.h1Mask}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        initial={{ y: 100, opacity: 0, scale: 0.8 }}
                        animate={hasEnteredFromTop ? { y: 0, opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                        KREATIV FÜR <br />KLASSE&nbsp;
                        <span className={styles.underline}> 
                            KUNDEN
                            <SVG aria-label="Unterstreichung" src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVGMask}></SVG>
                        </span>
                    </motion.h1>
                )}
            </motion.div>

            {/****** Body ******/}
            <div className={styles.body}>
                <motion.h1 
                    className={`h1 ${styles.h1}`}
                    initial={{ y: 100, opacity: 0,scale: 0.8 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    animate={hasEnteredFromTop ? { y: 0, opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    KREATIV FÜR <br />KLASSE&nbsp;
                    <span className={styles.underline}> 
                        KUNDEN
                        <SVG aria-label="Unterstreichung" src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVG}></SVG>
                    </span>
                </motion.h1>
            </div>
        </div>
    );
}
