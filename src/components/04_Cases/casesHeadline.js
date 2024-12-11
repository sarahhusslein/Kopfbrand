import React from 'react';
import { motion } from 'framer-motion';
import styles from './casesHeadline.module.css';
import SVG from 'react-inlinesvg';


export default function CasesHeadline() {
    return (
        <div className={styles.container}>
            <motion.h1 
            className={`h1 ${styles.h1}`}
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeInOut"}}
            >
                KREATIV FÜR <br />KLASSE&nbsp;
                <span className={styles.underline}> 
                    KUNDEN
                    <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVG}></SVG>
                </span>
            </motion.h1>
        </div>
    );
}
