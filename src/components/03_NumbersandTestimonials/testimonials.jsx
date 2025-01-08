"use client";
import React, { useState } from 'react';
import styles from './testimonials.module.css';
import SVG from 'react-inlinesvg';
import Lottie from 'lottie-react'; 
import satelliteAnimation from '../../../public/animations/satelliteAnimation.json';
import { motion, AnimatePresence } from 'framer-motion';



const testimonials = [
    {
        id: 1,
        name: "Michael Patrick Struck",
        position: "CEO & Founder RUBY HOTELS",
        description: [
            "Kopfbrand bietet eine ",
            { text: "seltene Kombination: ", highlight: true },
            "Das Engagement und das Qualitätsbewusstsein einer inhabergeführten, kleinen Agentur: gepaart mit außerordentlicher Kreativität und handwerklicher Finesse wie sie sonst nur bei großen Agenturen zu finden sind.",
        ],
    },
    {
        id: 2,
        name: "Victoria Reuter",
        position: "Vorstand UMWELTSTIFTUNG",
        description: [
            "Wir wollen nichts verkaufen, sondern die Köpfe und Herzen der Menschen erreichen. Gerade deshalb brauchen wir in den Bereichen Grafik und Design keine Standardlösungen, sondern ",
            { text: "maßgeschneiderte Lösungen mit “Feeling”. ", highlight: true },
            "Dabei setzen wir seit über 10 Jahren auf die Zusammenarbeit mit Kopfbrand.",
        ],
    },
    {
        id: 3,
        name: "Doris Waldmann",
        position: "Marketing Manager LANGENSCHEIDT",
        description: [
            "Die Ideen & Konzepte von Kopfbrand begeistern uns jedes Jahr aufs Neue. Wir arbeiten ",
            { text: "seit 8 Jahren gerne mit Christoph & seinem unkomplizierten, zuverlässigen Kreativ-Team. ", highlight: true },
            "Uns verbinden hunderte von Anzeigen, Plakatkampagnen und Werbemittelgestaltung vom Fruchtgummi-Tütchen bis zum Vorschau-Design.",
        ],
    },
];


const renderDescription = (description) => {
    return description.map((part, index) => {
        if (typeof part === 'string') {
            return <span key={index}>{part}</span>;
        }
        return (
            <span key={index} className="body-highlighted">
                {part.text}
            </span>
        );
    });
};


export default function Testimonials() {

    const [[page, direction], setPage] = useState([0, 0]);

    // Normalize the page number to handle infinite loop
    const activeIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;


    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    const dragEndHandler = (event, info) => {
        const swipeThreshold = 20; // Match this with dragConstraints
        const velocityThreshold = 20; // Lower this to make it less sensitive
        
        // Only trigger swipe if offset is significant OR velocity is high enough
        if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > velocityThreshold) {
            if (info.offset.x > 0) {
                paginate(-1);
            } else {
                paginate(1);
            }
        }
    };

    const calculateCardStyle = (index) => {
        let diff = index - activeIndex;
        const totalItems = testimonials.length;
        
        if (diff > totalItems / 2) diff -= totalItems;
        if (diff < -totalItems / 2) diff += totalItems;
    
        const isActive = diff === 0;
        
        return {
            rotateY: diff * 60,
            x: diff * 50,
            z: Math.abs(diff) * -100,
            // Hide cards that are more than 1 position away
            scale: Math.abs(diff) > 1 ? 0 : Math.max(0.7, 1 - Math.abs(diff) * 0.2),
            opacity: Math.abs(diff) > 1 ? 0 : Math.max(0.5, 1 - Math.abs(diff) * 0.5),
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            },
            hover: isActive ? 1.03 : 0.85
        };
    };

    const handleCardClick = (clickedIndex) => {
        // Skip if clicking the active card
        if (clickedIndex === activeIndex) return;
        
        // Calculate the shortest path to the clicked card
        let diff = clickedIndex - activeIndex;
        const totalItems = testimonials.length;
        
        // Adjust for wrapping (e.g., going from last to first card)
        if (diff > totalItems / 2) diff -= totalItems;
        if (diff < -totalItems / 2) diff += totalItems;
        
        // Paginate in the appropriate direction
        paginate(diff > 0 ? 1 : -1);
    };



  return (
    <div className={styles.container}>
        {/* <div className={styles.animation}>
            <Lottie 
                animationData={satelliteAnimation}
                className={styles.satelliteAnimation}
                loop={true}
                autoplay={true}
            />
        </div > */}
        <motion.div 
        className={styles.animation}
        initial={{ y: 30, opacity: 0.2 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeInOut"}}
        >
            <SVG src="/illustrations/arrowBottomRight.svg"/>
        </motion.div>
        <motion.div 
        className={styles.testimonialSection}
        initial={{ y: 50, opacity: 0, scale: 0.8 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeInOut"}}
        >
            <div className={styles.carousel}>
                <AnimatePresence initial={false} mode="popLayout">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                        key={testimonial.id}
                        className={`${styles.testimonialCard} ${
                            index === activeIndex 
                                ? styles.activeCard 
                                : Math.abs(index - activeIndex) === 1 
                                    ? styles.neighborCard 
                                    : ''
                        }`}
                        style={{ position: 'absolute' }}
                        animate={calculateCardStyle(index)}
                        drag="x"
                        dragConstraints={{ left: -60, right: 60 }}
                        dragElastic={0.2}
                        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                        onDragEnd={dragEndHandler}
                        onClick={() => handleCardClick(index)}
                        whileHover={(custom) => ({ 
                            scale: custom.hover,
                            transition: { duration: 0.2 }
                        })}
                        custom={calculateCardStyle(index)}
                    >
                            <div className={styles.quoteContainer}>
                                <motion.div 
                                    className={styles.quoteSVG}
                                    initial={{ scale: 0.5}}
                                    animate={{ 
                                        scale: index === activeIndex ? 1 : 0.5, 
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }}
                                >
                                    <SVG src="/illustrations/quote.svg"/>
                                </motion.div>
                                <div className={styles.textContent}>
                                    <h3 className={`h3 ${styles.name}`}>
                                        {testimonial.name}
                                    </h3>
                                    <p className={`body-light ${styles.position}`}>
                                        {testimonial.position}
                                    </p>
                                    <p className={`body ${styles.description}`}>
                                        {renderDescription(testimonial.description)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
        <motion.div 
        className={styles.headlineSection}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeInOut"}}
        >
            <h1 className={`h1 ${styles.h1}`}>
            FLUR
            <br />
            <span className={styles.underline}> 
                FUNK
                <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.underlineSVG}/>
            </span>
            </h1>
        </motion.div>
    </div>
  );
}


