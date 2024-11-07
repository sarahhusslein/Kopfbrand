"use client";
import React, { useState } from 'react';
import styles from './testimonials.module.css';
import SVG from 'react-inlinesvg';


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

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

  return (
    <div className={styles.container}>
        <div className={styles.arrowSection}>
            <SVG src="/illustrations/arrowBottomRight.svg" className={styles.SVG} onClick={handlePrev}/>
        </div>
        <div className={styles.testimonialSection}>
            {/* <button className={styles.arrowButton}>
                <SVG src="/icons/chevronLeft.svg" className={styles.chevron}/>
            </button> */}
            <div className={styles.testimonialCard}>
                <div className={styles.quoteContainer}>
                    <SVG src="/illustrations/quote.svg" className={styles.quoteSVG}/>
                    <div className={styles.textContent}>
                        <h3 className={`h3 ${styles.name}`}>{testimonials[currentIndex].name}</h3>
                        <p className={`body-light ${styles.position}`}>{testimonials[currentIndex].position}</p>
                        <p className={`body ${styles.description}`}>{renderDescription(testimonials[currentIndex].description)}</p>
                    </div>
                </div>
            </div>
            {/* <button className={styles.arrowButton}>
                <SVG src="/icons/chevronRight.svg" className={styles.chevron} onClick={handleNext}/>
            </button> */}
        </div>
        <div className={styles.headlineSection}>
            <h1 className={`h1 ${styles.h1}`}>
            FLUR
            <br />
            <span className={styles.underline}> 
                FUNK
                <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.underlineSVG}/>
            </span>
            </h1>
        </div>
    </div>
  );
}


