"use client";
import React from 'react';
import styles from './header.module.css';
import SVG from 'react-inlinesvg';
import LogoSlider from './logoSlider';



export default function Header() {


  return (
    <div className={styles.container}>
        <h1 className={`h1 ${styles.h1}`}>UNSERE KÖPFE</h1>
        <h4 className={`subtitle ${styles.h4}`}>Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus ut similique ipsum aut neque dolorem in quia doloremque aut officia quae.</h4>
        <button className={styles.button}>
            <SVG src="/icons/arrowDown.svg" className={styles.arrowIcon} />
        </button>
        {/* <div className={styles.logoSlider}>
          <LogoSlider />
        </div> */}
    </div>
  );
}

