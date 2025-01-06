'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './casesHeadlineNew.module.css';
import SVG from 'react-inlinesvg';
import useMousePosition from '@/utils/useMousePosition';

export default function CasesHeadlineNew() {
    const [isHovered, setIsHovered] = useState(false);
    const { mousePosition, updateMousePosition } = useMousePosition();   
    const size = isHovered ? 350 : 40;

    return (
        <div 
            className={styles.container}
            onMouseMove={updateMousePosition}
        >
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
                <motion.h1 
                    className={`h1 ${styles.h1Mask}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    initial={{ y: 100, opacity: 0, scale: 0.8 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.6}}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    KREATIV FÜR <br />KLASSE&nbsp;
                    <span className={styles.underline}> 
                        KUNDEN
                        <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVGMask}></SVG>
                    </span>
                </motion.h1>
            </motion.div>
            <div className={styles.body}>
                <motion.h1 
                    className={`h1 ${styles.h1}`}
                    initial={{ y: 100, opacity: 0,scale: 0.8 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    KREATIV FÜR <br />KLASSE&nbsp;
                    <span className={styles.underline}> 
                        KUNDEN
                        <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVG}></SVG>
                    </span>
                </motion.h1>
            </div>
        </div>
    );
}
