"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './casesOverview.module.css';
import { useMediaQuery } from 'react-responsive';


const images = [
    "/images/caseStudyBanners.png",
    "/images/caseStudyMagazineKid.jpg",
    "/images/caseStudyAbstractShape.jpg",
    "/images/caseStudyCat.jpg",
    "/images/caseStudyHotelGrey.jpg",
    "/images/caseStudyDesignTable.jpg",
    "/images/caseStudyWall.jpg",
    "/images/caseStudyMagazineOpen.jpg",
    "/images/caseStudyHotelBrown.jpg",
]

export default function CasesOverview() {

    const ref = useRef(null);
    const [dynamicScale, setDynamicScale] = useState(1);
    const isMobile = useMediaQuery({ maxWidth: 768 });


    useEffect(() => {
        const calculateScale = () => {
            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
    
            // Define grid gap
            const gridGap = 5; // matches your CSS gap value
    
            // Calculate total gap space
            const horizontalGaps = 2 * gridGap; // 2 gaps horizontally
            const verticalGaps = 2 * gridGap; // 2 gaps vertically
    
            // Calculate the available space for the grid
            const availableGridWidth = viewportWidth - horizontalGaps -125;
            const availableGridHeight = viewportHeight - verticalGaps -125;
    
            // Calculate the middle image dimensions
            const middleImageWidth = availableGridWidth * (1.5 / 3.5);  // 1.5fr of total 3.5fr
            const middleImageHeight = availableGridHeight * (1.5 / 3.5); // 1.5fr of total 3.5fr
    
            // Calculate scale needed to fill viewport
            const scaleX = viewportWidth / middleImageWidth;
            const scaleY = viewportHeight / middleImageHeight;
    
            // Use the smaller scale to ensure it fits within the viewport
            setDynamicScale(Math.max(scaleX, scaleY));
        };
    
        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, []);


    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const { scrollYProgress: opacityProgress } = useScroll({
        target: ref,
        offset: ["start end", "start center"]
    });

    const containerOpacity = useTransform(opacityProgress, [0, 1], [0.1, 1]);
    const scale = useTransform(
        scrollYProgress,
        [0, isMobile ? 0.3 : 1], // Use a faster zoom for mobile
        [1, dynamicScale]
    );
    const imageScale = useTransform(
        scrollYProgress,
        [0, isMobile ? 0.3 : 1], // Adjust similarly for image scale
        [1, 1.2]
    );
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);




    return (
        <motion.div 
        className={styles.outerContainer} 
        ref={ref}
        style={{
            opacity: containerOpacity,
        }}
        >
            <div className={styles.overviewContainer}>
                <motion.div
                    className={styles.gridContainer}
                    style={{
                        scale,
                        transformOrigin: "center center", // Skaliere aus der Mitte
                    }}
                >
                    {images.map((src, index) => (
                        <div key={index} className={styles.imageContainer}>
                            <motion.img 
                            src={src} 
                            alt={`case ${index}`} 
                            className={styles.image} 
                            style={{
                                scale: imageScale,
                            }}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}