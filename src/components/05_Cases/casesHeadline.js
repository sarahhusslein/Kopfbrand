import React from 'react';
import styles from './casesHeadline.module.css';
import SVG from 'react-inlinesvg';


export default function CasesHeadline() {
    return (
        <div className={styles.container}>
            <h1 className={`h1 ${styles.h1}`}>
                KREATIV FÜR <br />KLASSE&nbsp;
                <span className={styles.underline}> 
                    KUNDEN
                    <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVG}></SVG>
                </span>
            </h1>
        </div>
    );
}
