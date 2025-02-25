"use client";
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import styles from './testimonials.module.css';
import SVG from 'react-inlinesvg';



/***************************** 
Type Declarations and Arrays
*****************************/
// 🟢 Types for the testimonials
interface Testimonial {
    id: number;
    name: string;
    position: string;
    description: Array<string | { text: string, highlight: boolean }>;
}

// 🟢 Type for the page state
type PageState = [number, number];

// 🟢 Testimonials array
const testimonials: Testimonial[] = [
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
        name: "Claus Obermeier",
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
        position: "Marketing Mngr. LANGENSCHEIDT",
        description: [
            "Die Ideen & Konzepte von Kopfbrand begeistern uns jedes Jahr aufs Neue. Wir arbeiten ",
            { text: "seit 8 Jahren gerne mit Christoph & seinem unkomplizierten, zuverlässigen Kreativ-Team. ", highlight: true },
            "Uns verbinden hunderte von Anzeigen, Plakatkampagnen und Werbemittelgestaltung vom Fruchtgummi-Tütchen bis zum Vorschau-Design.",
        ],
    },
];



/***************************** 
Functions
*****************************/
// 🟢 Function to render the description
const renderDescription = (description: Array<string | { text: string, highlight: boolean }>) => {
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

    /***************************** 
    State Declarations
    *****************************/
    // 🟢 States, Refs and Device Types
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [[page, direction], setPage] = useState<PageState>([0, 0]);

    // 🟢 Normalize the page number to handle infinite loop
    const activeIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;



    /***************************** 
    Functions
    *****************************/
    // 🟢 Function to paginate
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    // 🟢 Function to handle drag end
    const dragEndHandler = (event: any, info: any) => {
        const swipeThreshold = 20; // Match this with dragConstraints
        const velocityThreshold = 20; // Lower this to make it less sensitive
        
        // 🟢 Only trigger swipe if offset is significant OR velocity is high enough
        if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > velocityThreshold) {
            if (info.offset.x > 0) {
                paginate(-1);
            } else {
                paginate(1);
            }
        }
    };

    // 🟢 Function to calculate card style
    const calculateCardStyle = (index: number) => {
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

    // 🟢 Animation controls
    const controls = useAnimation();

    // 🟢 Function to handle card click
    const handleCardClick = (clickedIndex: number) => {
        // 🟢 Skip if clicking the active card
        if (clickedIndex === activeIndex) return;
        
        // 🟢 Calculate the shortest path to the clicked card
        let diff = clickedIndex - activeIndex;
        const totalItems = testimonials.length;
        
        // 🟢 Adjust for wrapping (e.g., going from last to first card)
        if (diff > totalItems / 2) diff -= totalItems;
        if (diff < -totalItems / 2) diff += totalItems;
        
        // 🟢 Trigger the animation: first set opacity to 0
        controls.start({ opacity: 0 }).then(() => {
            // 🟢 After a short delay, set opacity to 1
            setTimeout(() => {
                controls.start({ opacity: 1 });
            }, 50);
        });
        
        // 🟢 Paginate in the appropriate direction
        paginate(diff > 0 ? 1 : -1);
    };


    /***************************** 
    Render
    *****************************/
    return (
        <div>
            {isMobile ? (
                    <div className={styles.container}>

                        {/****** Headline ******/}
                        <motion.div 
                            className={styles.headlineSection}
                        >
                            <motion.h1 
                                className={`h1 ${styles.h1}`}
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.7, ease: "easeInOut"}}
                            >
                            FLUR
                            <span className={styles.underline}> 
                                FUNK
                                <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.underlineSVG}/>
                            </span>
                            </motion.h1>
                        </motion.div>

                        {/****** Testimonials ******/}
                        <motion.div 
                            className={styles.testimonialRowContainer}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.5, ease: "easeInOut"}}
                        >
                            <div className={styles.testimonialRow}>
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className={styles.testimonialCardMobile}
                                    >
                                        <div className={styles.quoteContainer}>
                                            <div className={styles.quoteSVG}>
                                                <SVG src="/illustrations/quote.svg"/>
                                            </div>
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
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <motion.div 
                            className={styles.animation}
                            initial={{ y: 30, opacity: 0.2 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.7, ease: "easeInOut"}}
                        >
                            <SVG src="/illustrations/arrowBottomRight.svg"/>
                            {/* <div className={styles.animation}>
                                <Lottie 
                                    animationData={satelliteAnimation}
                                    className={styles.satelliteAnimation}
                                    loop={true}
                                    autoplay={true}
                                />
                            </div > */}
                        </motion.div>
                        <motion.div 
                            className={styles.testimonialSection}
                            initial={{ y: 50, opacity: 0, scale: 0.8 }}
                            whileInView={{ y: 0, opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.7, ease: "easeInOut"}}
                        >

                            {/****** Testimonials Carousel ******/}
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
                                            style={{ position: 'absolute', zIndex: index === activeIndex ? 10 : 1 }}
                                            animate={calculateCardStyle(index)}
                                            drag="x"
                                            dragConstraints={{ left: -60, right: 60 }}
                                            dragElastic={0.2}
                                            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                                            onDragEnd={dragEndHandler}
                                            onClick={() => handleCardClick(index)}
                                            whileHover={{
                                                scale: calculateCardStyle(index).hover,
                                                transition: { duration: 0.2 }
                                            }}
                                            custom={calculateCardStyle(index)}
                                    >
                                            <div className={styles.quoteContainer}>
                                                <motion.div
                                                    className={styles.quoteSVG}
                                                    initial={{ scale: 0.3}}
                                                    animate={{ 
                                                        scale: index === activeIndex ? 1 : 0.3, 
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        ease: "easeOut"
                                                    }}
                                                >
                                                    <SVG aria-label="Zitat Icon" src="/illustrations/quote.svg"/>
                                                </motion.div>
                                                <motion.div 
                                                    className={styles.textContent}
                                                    initial={{ opacity: 1, y: 10 }}
                                                    animate={index === activeIndex ? controls : { opacity: 0.9, y: 0 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                >
                                                    <h3 className={`h3 ${styles.name}`}>
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className={`body-light ${styles.position}`}>
                                                        {testimonial.position}
                                                    </p>
                                                    <p className={`body ${styles.description}`}>
                                                        {renderDescription(testimonial.description)}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/****** Headline ******/}
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
                                <SVG aria-label="Unterstreichung" src={'/illustrations/underlineHanddrawn.svg'} className={styles.underlineSVG}/>
                            </span>
                            </h1>
                        </motion.div>
                    </div>
                )
            }
        </div>
    );
}


