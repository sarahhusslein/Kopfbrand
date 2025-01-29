"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './casesOverviewNew.module.scss';


export default function CasesOverview() {

    const container = useRef(null);
    const { scrollYProgress: scaleProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    const { scrollYProgress: overviewProgress} = useScroll({
        target: container,
        offset: ["50vh end", "start start"]
    });

    const baseMaxScale : number = 100/27.5;  // This will scale from 30vw to 100vw

    const scale1 = useTransform(scaleProgress, [0, 1], [1, baseMaxScale]);
    const scale2 = useTransform(scaleProgress, [0, 1], [1, baseMaxScale * 1.5]);
    const scale3 = useTransform(scaleProgress, [0, 1], [1, baseMaxScale * 2.25]);
    const scale4 = useTransform(scaleProgress, [0, 1], [1, baseMaxScale * 1.75]);
    const scale5 = useTransform(scaleProgress, [0, 1], [1, baseMaxScale * 2]);
    const scale6 = useTransform(scaleProgress, [0, 1], [1, baseMaxScale * 2.25]);
    const scale7 = useTransform(scaleProgress, [0, 1], [1, baseMaxScale * 2.5]);
    const scale8 = useTransform(scaleProgress, [0, 1], [1, baseMaxScale * 2.75]);

    const overviewOpacity = useTransform(overviewProgress, [0, 1], [0.1, 1]);


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
        const unsubscribe = scaleProgress.on('change', (latest) => {
            // When image is fully scaled (around 0.8-1.0 of scroll progress)
            if (latest > 0.8) {
                // Dispatch custom event
                window.dispatchEvent(new CustomEvent('imageFullyScaled', {
                    detail: { image: "/images/caseStudyHotelGrey.jpg" }
                }));
            }
        });

        return () => unsubscribe();
    }, [scaleProgress]);

    
    


    return (
        <div className={styles.container} ref={container} >
            <motion.div className={styles.sticky} style={{opacity: overviewOpacity}}>
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
            </motion.div>
        </div>
    );
}