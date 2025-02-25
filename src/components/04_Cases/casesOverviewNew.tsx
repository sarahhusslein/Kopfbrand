"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'; 
import styles from './casesOverviewNew.module.scss';




export default function CasesOverview() {

    /***************************** 
    State Declarations
    *****************************/
    // 🟢 States, Refs and Device Types
    const container = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 768 }); 


    /***************************** 
    Animations
    *****************************/
    // 🟢 Effect to handle scroll progress tracking
    const { scrollYProgress: scaleProgress } = useScroll({
        target: container,
        offset: ["start start", isMobile ? "end -50%" : "end end"]
    });

    const { scrollYProgress: overviewProgress} = useScroll({
        target: container,
        offset: ["50vh end", "start start"]
    });

    // 🟢 Base max scale
    const baseMaxScale : number = isMobile ? 100/26.5 : 100/25;

    // 🟢 Scale animations for the images
    const scale1 = useTransform(scaleProgress, [0, isMobile ? 0.5 : 1], [1, baseMaxScale]);
    const scale2 = useTransform(scaleProgress, [0, isMobile ? 0.5 : 1], [1, baseMaxScale * 1.5]);
    const scale3 = useTransform(scaleProgress, [0, isMobile ? 0.5 : 1], [1, baseMaxScale * 2.25]);
    const scale4 = useTransform(scaleProgress, [0, isMobile ? 0.5 : 1], [1, baseMaxScale * 1.75]);
    const scale5 = useTransform(scaleProgress, [0, isMobile ? 0.5 : 1], [1, baseMaxScale * 2]);
    const scale6 = useTransform(scaleProgress, [0, isMobile ? 0.5 : 1], [1, baseMaxScale * 2.25]);
    const scale7 = useTransform(scaleProgress, [0, isMobile ? 0.5 : 1], [1, baseMaxScale * 2.5]);
    const scale8 = useTransform(scaleProgress, [0, isMobile ? 0.5 : 1], [1, baseMaxScale * 2.75]);


    // 🟢 Images array
    const images = [
        {src: "/images/caseStudyHotelGrey.jpg", alt: "image", scale: scale1},
        {src: "/images/caseStudyMagazineKid.jpg", alt: "image", scale: scale2},
        {src: "/images/caseStudyRubyHotel.jpg", alt: "image", scale: scale3},
        {src: "/images/caseStudyPons.jpg", alt: "image", scale: scale4},
        {src: "/images/caseStudyLBV.jpg", alt: "image", scale: scale5},
        {src: "/images/caseStudyLangenscheidt.jpg", alt: "image", scale: scale6},
        {src: "/images/storeWindowKopfbrand.jpg", alt: "image", scale: scale7},
        {src: "/images/marioBarthCover.jpg", alt: "image", scale: scale8},
    ]

    // 🟢 Opacity animation for the overview
    const overviewOpacity = useTransform(overviewProgress, [0, 1], [0.1, 1]);

    // 🟢 Share scroll progress with Cases component
    useEffect(() => {
        const unsubscribe = scaleProgress.on('change', (latest) => {

            const threshold = isMobile ? 0.4 : 0.8;
            // When image is fully scaled 
            if (latest > threshold) {
                // Dispatch custom event
                window.dispatchEvent(new CustomEvent('imageFullyScaled', {
                    detail: { image: "/images/caseStudyHotelGrey.jpg" }
                }));
            }
        });

        return () => unsubscribe();
    }, [scaleProgress, isMobile]);

    // useEffect(() => {
    //     return scaleProgress.on("change", (latest) => {
    //         console.log("ScrollYProgress:", latest);
    //     });
    // }, [scaleProgress]);

    // useEffect(() => {
    //     console.log("Viewport-Höhe:", window.innerHeight);
    //     console.log("Container-Höhe:", container?.current?.offsetHeight);
    // });
    


    
    
    /***************************** 
    Render
    *****************************/
    return (
        <div className={styles.container} ref={container} >
            <motion.div className={styles.sticky} style={{opacity: overviewOpacity}}>

                {/****** Images ******/}
                {images.map(({src, scale}, index) => (
                    <motion.div key={index} className={styles.element} style={{scale}}>
                        <div className={styles.imageContainer}>
                            <Image 
                                aria-label={`Bild von ${images[index].alt}`}
                                src={src}
                                fill
                                alt={images[index].alt}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}