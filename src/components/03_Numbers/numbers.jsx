"use client";
import React from 'react';
import styles from './numbers.module.css';
import SVG from 'react-inlinesvg';



const numbers = [
    {
        id: 1,
        number: 0,
        keyword: "Internationale Awards",
    },
    {
        id: 2,
        number: 0,
        keyword: "Agentur-Flamingos",
    },
    {
        id: 3,
        number: 0,
        keyword: "EUR versteckte Kosten",
    },
    {
        id: 4,
        number: 0,
        keyword: "Unzufriedene Kunden",
    },
];


export default function Numbers() {


  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.headline}>
                <h2 className={`h2 ${styles.h2}`}>
                UNSERE
                <br />
                <span className={styles.underline}> 
                    ZAHLEN
                    <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.underlineSVG}/>
                </span>
                </h2>
            </div>
            <div className={styles.numbersRow}>
                {numbers.map((number) => (
                    <div className={styles.numbersColumn} key={number.id}>
                        <p className={`numbers-small ${styles.number}`}>{number.number}</p>
                        <p className={`body ${styles.keyword}`}>{number.keyword}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}


