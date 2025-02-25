'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Typewriter } from 'react-simple-typewriter';  
import Tilt from 'react-parallax-tilt';
import styles from './contact.module.css';
import SVG from 'react-inlinesvg';
import arrowAnimation from '/public/animations/arrowRightAnimation.json';


const Lottie = dynamic(() => import('lottie-react'), { ssr: false });



export default function Contact() {

    /***************************** 
    State Declarations
    *****************************/
    // 🟢 States, Refs and Device Types
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const rightContainerRef = useRef<HTMLDivElement | null>(null);
    const { ref: textRef, inView } = useInView({
        threshold: 0.5, 
    });

    /***************************** 
    Functions
    *****************************/
    // 🟢 Effect to handle mouse movement
    useEffect(() => {
        const container = rightContainerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; // mouse position relative to container
            const y = e.clientY - rect.top;

            // 🟢 Update the radial gradient position
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);
        };

        container.addEventListener('mousemove', handleMouseMove);
        return () => container.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleTouchStart = () => {
        if (isMobile && rightContainerRef.current) {
          rightContainerRef.current.classList.add(styles.flashlightActive);
        }
      };
    
      const handleTouchEnd = () => {
        if (isMobile && rightContainerRef.current) {
          rightContainerRef.current.classList.remove(styles.flashlightActive);
        }
      };


    /***************************** 
    Animations
    *****************************/
    // 🟢 Animation for the right container
    const itemAnimationMobile = {
    initial: { y: 40, opacity: 0 },
    inView: {
        y: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            ease: "easeInOut",
            duration: 0.5
        }
    }
    };



    /***************************** 
    Render
    *****************************/
    return (
        <div className={styles.outerContainer}>
            <Tilt 
                tiltMaxAngleX={isMobile ? 0 : 5} 
                tiltMaxAngleY={isMobile ? 0 : 5} 
                glareEnable={false} 
                transitionSpeed={3000}
                transitionEasing='cubic-bezier(0.1, 1, 0.1, 1)'
            >
            <motion.div 
                className={ styles.container}
                initial={{ y: 40, opacity: 0, scale: 0.8 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.05}}
                transition={{ duration: 0.7, ease: "easeInOut"}}
            >
                {/****** Left Container ******/}
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
                    />
                </div>

                {/****** Right Container ******/}
                <motion.div 
                    className={ styles.rightContainer} 
                    ref={rightContainerRef} 
                    onTouchStart={handleTouchStart} 
                    onTouchEnd={handleTouchEnd}
                    variants={ isMobile ? itemAnimationMobile : {}}
                    initial="initial"
                    whileInView="inView"
                    viewport={{ once: false, amount: 0.5 }}
                >
                    <motion.h2  
                        className={`h2`} 
                    >
                        LETS&nbsp;
                        <span className={styles.underline}> 
                        TALK!
                        <SVG aria-label="Unterstreichung" src={'/illustrations/underlineHanddrawnShort.svg'} className={styles.SVG}></SVG>
                        </span>
                    </motion.h2>
                    <motion.p 
                        className={`body-light ${styles.bodyLight}`}
                    >
                        Große Pläne, kleiner Plausch oder einfach nur Lust auf Kaffee? Wir freuen uns, von dir zu hören.
                    </motion.p>
                    <motion.div 
                        className={styles.buttonRow}
                    >
                        <div className={styles.buttonContainer}>
                            <p className={`body ${styles.body}`}>Direkter Draht zu uns:</p>
                            <button className={styles.phoneButton} /* onClick={() => window.location.href = 'tel:+498924224281'} */> 
                                <SVG aria-label="Telefon" src="/icons/phone.svg" className={styles.phoneIcon} />
                                Jetzt anrufen
                            </button>
                        </div>
                        <div className={styles.buttonContainer}>
                            <p className={`body ${styles.body}`}>Sag’s geschrieben:</p>
                            <button className={styles.mailButton} /*onClick={() => window.location.href = 'mailto:info@kopfbrand.com'} */>
                                <SVG aria-label="E-Mail" src="/icons/mail.svg" className={styles.mailIcon} />
                                Jetzt mailen
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
            </Tilt>
        </div>
    );
}