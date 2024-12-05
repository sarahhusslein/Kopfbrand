"use client";
import React from 'react';
import styles from './numbersAndTestimonials.module.css';
import Numbers from './numbers';
import Testimonials from './testimonials';

export default function NumbersAndTestimonials() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.numbersContainer}>
        <Numbers />
      </div>
      <div className={styles.testimonialsContainer}>
        <Testimonials />
      </div>
    </div>
  );
}