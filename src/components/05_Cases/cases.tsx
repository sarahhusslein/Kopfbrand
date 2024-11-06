"use client"
import React from 'react'; 
import styles from './cases.module.css';
import SVG from 'react-inlinesvg';


export default function Cases() {


    return (
        <div className={styles.container}>
            <img className={styles.image}src="/images/caseStudyExample.png" alt="caseStudyExample" />
            <div className={styles.overlay} />
            <div className={styles.textContainer}>
                <h2 className={`h2 ${styles.h2}`}> RUBY HOTELS</h2>
                <h4 className={`subtitle ${styles.subtitle}`}>Visuelle Gestaltung der kompletten Hotelausstattung von der Bodylotion bis zur Keycard.</h4>
            </div>            
        </div>
    );
}