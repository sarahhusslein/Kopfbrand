"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './casesOverview.module.css';


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

    // Dynamische Berechnung des Scale-Werts basierend auf Viewport-Größe
    useEffect(() => {
    const gridWidth = window.innerWidth * 1.0; // Grid ist 110vw breit
    const gridHeight = window.innerHeight * 1.0; // Grid ist 110vh hoch

    const middleImageWidth = gridWidth / 3 * 1.5; 
    const middleImageHeight = gridHeight / 3 * 1.5;

    const scaleWidth = window.innerWidth / middleImageWidth;
    const scaleHeight = window.innerHeight / middleImageHeight;

    setDynamicScale(Math.max(scaleWidth, scaleHeight)); 
    }, []);


    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const scale = useTransform(scrollYProgress, [0, 1], [1, dynamicScale]);




    return (
        <div className={styles.casesOverview}>
            <div className={styles.overviewContainer} ref={ref}>
                <motion.div
                    className={styles.gridContainer}
                    style={{
                        scale,
                        transformOrigin: "center center", // Skaliere aus der Mitte
                    }}
                >
                    {images.map((src, index) => (
                        <div key={index} className={styles.imageContainer}>
                            <img src={src} alt={`case ${index}`} className={styles.image} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}