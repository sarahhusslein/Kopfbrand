"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './casesOverviewNew.module.scss';


export default function CasesOverview() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    const baseMaxScale = 100/30;  // This will scale from 35vw to 100vw

    const scale1 = useTransform(scrollYProgress, [0, 1], [1, baseMaxScale]);
    const scale2 = useTransform(scrollYProgress, [0, 1], [1, baseMaxScale * 1.25]);
    const scale3 = useTransform(scrollYProgress, [0, 1], [1, baseMaxScale * 1.5]);
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, baseMaxScale * 1.75]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, baseMaxScale * 2]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, baseMaxScale * 2.25]);
    const scale7 = useTransform(scrollYProgress, [0, 1], [1, baseMaxScale * 2.5]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, baseMaxScale * 2.75]);

    const images = [
        {src: "/images/caseStudyHotelGrey.jpg", scale: scale1},
        {src: "/images/caseStudyMagazineKid.jpg", scale: scale2},
        {src: "/images/caseStudyAbstractShape.jpg", scale: scale3},
        {src: "/images/caseStudyCat.jpg", scale: scale4},
        {src: "/images/caseStudyBanners.png", scale: scale5},
        {src: "/images/caseStudyWall.jpg", scale: scale6},
        {src: "/images/caseStudyDesignTable.jpg", scale: scale7},
        {src: "/images/caseStudyHotelBrown.jpg", scale: scale8},
    ]


    // Share scroll progress with Cases component
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            // When image is fully scaled (around 0.8-1.0 of scroll progress)
            if (latest > 0.8) {
                // Dispatch custom event
                window.dispatchEvent(new CustomEvent('imageFullyScaled', {
                    detail: { image: "/images/caseStudyHotelGrey.jpg" }
                }));
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);


    return (
        <div className={styles.container} ref={container}>
            <div className={styles.sticky}>
                {images.map(({src, scale}, index) => (
                    <motion.div key={index} className={styles.element} style={{scale}}>
                        <div className={styles.imageContainer}>
                            <Image 
                                src={src}
                                fill
                                alt="image"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}