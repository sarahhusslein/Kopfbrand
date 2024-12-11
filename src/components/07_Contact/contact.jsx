'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './contact.module.css';
import SVG from 'react-inlinesvg';
import Lottie from 'lottie-react'; 
import arrowAnimation from '/public/animations/arrowRightAnimation.json';
import { useInView } from 'react-intersection-observer';
import { Typewriter } from 'react-simple-typewriter';  



export default function Contact() {

    const rightContainerRef = useRef(null);
    const { ref: textRef, inView } = useInView({
        threshold: 0.5, 
    });

    useEffect(() => {
        const container = rightContainerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; // mouse position relative to container
            const y = e.clientY - rect.top;

            // Update the radial gradient position
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);
        };

        container.addEventListener('mousemove', handleMouseMove);
        return () => container.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={styles.outerContainer}>
            <motion.div 
            className={styles.container}
            initial={{ y: 40, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.05}}
            transition={{ duration: 0.7, ease: "easeInOut"}}
            >
                <div className={styles.leftContainer}>
                <h2 className={`h2 ${styles.h2}`} ref={textRef}>
                        {inView && (
                            <Typewriter
                                words={['NEUGIERIG\nGEWORDEN?']}
                                loop={1}
                                cursor={false}
                                typeSpeed={70}
                                delaySpeed={1000}
                            />
                        )}
                    </h2>
                    <Lottie 
                        animationData={arrowAnimation}
                        className={styles.arrowAnimation}
                        loop={true}
                        autoplay={true}
                        speed={1}
                    />
                </div>
                <div className={styles.rightContainer} ref={rightContainerRef}>
                    <h2 className={`h2`}>LETS&nbsp;
                        <span className={styles.underline}> 
                        TALK!
                        <SVG src={'/illustrations/underlineHanddrawnShort.svg'} className={styles.SVG}></SVG>
                        </span>
                    </h2>
                    <p className={`body-light ${styles.bodyLight}`}>Große Pläne, kleiner Plausch oder einfach nur Lust auf Kaffee? Wir freuen uns, von dir zu hören.</p>
                    <div className={styles.buttonRow}>
                        <div className={styles.buttonContainer}>
                            <p className={`body ${styles.body}`}>Direkter Draht zu uns:</p>
                            <button className={styles.phoneButton} /* onClick={() => window.location.href = 'tel:+498924224281'} */> 
                                <SVG src="/icons/phone.svg" className={styles.phoneIcon} />
                                Jetzt anrufen
                            </button>
                        </div>
                        <div className={styles.buttonContainer}>
                            <p className={`body ${styles.body}`}>Sag’s geschrieben:</p>
                            <button className={styles.mailButton} /*onClick={() => window.location.href = 'mailto:info@kopfbrand.com'} */>
                                <SVG src="/icons/mail.svg" className={styles.mailIcon} />
                                Jetzt mailen
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}