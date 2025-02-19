"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import styles from './header.module.css';
import SVG from 'react-inlinesvg';
import LogoSlider from './logoSlider';
import useMousePosition from '@/utils/useMousePosition';



export default function Header() {

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const videoSrc = isMobile ? '/videos/konfettiVideoMobile.mp4' : '/videos/konfettiVideoDesktop.mp4';
    const imageSrc = isMobile ? '/images/fallbackImageMobile.png' : '/images/fallbackImageDesktop.png';
    const [videoError, setVideoError] = useState(false);
    const { mousePosition, updateMousePosition } = useMousePosition();
    const [sparks, setSparks] = useState<Spark[]>([]);
    const isTouchingRef = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const touchPosRef = useRef({ x: 0, y: 0 });


    interface Spark {
        id: number;
        x: number;
        y: number;
        size: number;
        color: string;
        lifespan: number;
        velocityX: number;
        velocityY: number;
        curveFactor: number;
        acceleration: number;
    }
    

    const getRandomFlameColor = () => {
        const r = Math.floor(228 + Math.random() * (230 - 228)); 
        const g = Math.floor(Math.random() * 256); 
        const b = Math.floor(Math.random() * 63); 
        return `rgb(${r}, ${g}, ${b})`;
    };

        // ✅ Extracted addSpark function for reuse
        const addSpark = (x: number, y: number) => {
            const id = Date.now();
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 20 + 8;
    
            const newSpark: Spark = {
                id,
                x,
                y,
                size: Math.random() * 16 + 4,
                color: getRandomFlameColor(),
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
                curveFactor: (Math.random() - 0.5) * 30,
                acceleration: Math.random() * 0.8 + 0.05,
                lifespan: Math.random() * 3000 + 500,
            };
    
            setSparks((prev) => [...prev, newSpark]);
    
            setTimeout(() => {
                setSparks((prev) => prev.filter((spark) => spark.id !== id));
            }, newSpark.lifespan);
        };
    
        // ✅ Kept desktop logic unchanged
        useEffect(() => {
            if (mousePosition.x !== 0 && mousePosition.y !== 0) {
                addSpark(mousePosition.x, mousePosition.y);
            }
        }, [mousePosition]);
    
        // 📱 Mobile Touch Handling
        const handleTouchStart = (e: React.TouchEvent) => {
            e.preventDefault();
            isTouchingRef.current = true;
            const touch = e.touches[0];
            
            // 🔄 Speichere aktuelle Touch-Position in der Ref
            touchPosRef.current = { x: touch.clientX, y: touch.clientY };
            updateMousePosition({ x: touch.clientX, y: touch.clientY });
        
            if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    if (isTouchingRef.current) {
                        addSpark(touchPosRef.current.x, touchPosRef.current.y);
                    }
                }, 50); // Adjust the interval time as needed
            }
        };
    
        const handleTouchMove = (e: React.TouchEvent) => {
            e.preventDefault(); 
            const touch = e.touches[0];
        
            // 🔄 Update der aktuellen Touch-Position in der Ref
            touchPosRef.current = { x: touch.clientX, y: touch.clientY };
            updateMousePosition({ x: touch.clientX, y: touch.clientY });
        };
    
        const handleTouchEnd = () => {
            isTouchingRef.current = false;
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

    
    const handleClick = () => {
        if (typeof window !== 'undefined') { // Check if running in the browser
            const element = document.getElementById('services');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    

    const itemAnimation = {
        initial: { y: 20, opacity: 0 },
        inView: {
            y: 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                ease: "easeInOut",
                duration: 0.7
            }
        }
    };

    return (
        <div className={styles.container}>
            <div 
                className={styles.heroSection} 
                onMouseMove={updateMousePosition}
                onTouchStart={handleTouchStart} 
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
            {sparks.map((spark) => (
                    <motion.div
                        key={spark.id}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{
                        x: [0, spark.velocityX * 2, spark.velocityX * 3 + spark.curveFactor],
                        y: [0, spark.velocityY * 2, spark.velocityY * 3 + spark.curveFactor],
                        opacity: [1, 0.8, 0.2, 0],
                        scale: [1, 0.9, 0.6]
                    }}
                    transition={{ duration: spark.lifespan / 1000, type: "tween", ease: "backOut" }}
                    style={{
                        position: "absolute",
                        left: spark.x,
                        top: spark.y,
                        width: spark.size,
                        height: spark.size,
                        backgroundColor: spark.color,
                        borderRadius: "50%",
                        pointerEvents: "none",
                        filter: "blur(1px)",
                        mixBlendMode: "screen",
                        zIndex: 1000,
                        boxShadow: `0 0 ${spark.size / 3}px 3px ${spark.color}`
                    }}
                    />
                ))}
                <div className={styles.imageWrapper}>
                    {!videoError ? (
                            <video 
                                className={styles.heroVideo}  
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster={imageSrc}
                                onError={() => setVideoError(true)}
                            >
                                <source src={videoSrc} />
                            </video>
                        ) : (
                            <img src={imageSrc} alt="Fallback" className={styles.heroVideo} />
                        )}
                    <div className={styles.overlay} />
                </div>
                <motion.div 
                className={styles.content}
                variants={itemAnimation}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true}}
                >
                    <motion.h1 className={`h1 ${styles.h1}`} variants={itemAnimation}>UNSERE KÖPFE</motion.h1>
                    <motion.h4 className={`subtitle ${styles.h4}`} variants={itemAnimation}>Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus ut similique ipsum aut neque dolorem in quia doloremque aut officia quae.</motion.h4>
                    <Tilt
                        tiltMaxAngleX={15} 
                        tiltMaxAngleY={15} 
                        glareEnable={true}
                        glareBorderRadius='15px'
                        transitionSpeed={1000}
                        transitionEasing='cubic-bezier(0.1, 1, 0.1, 1)'
                        scale={1.1}
                    >
                        <motion.button 
                            aria-label="Scroll zu Services"
                            className={styles.button} 
                            variants={itemAnimation} 
                            onClick={handleClick}
                        >
                            <SVG 
                                aria-label="Pfeil nach unten"
                                src="/icons/arrowDown.svg" 
                                className={styles.arrowIcon} 
                            />
                        </motion.button>
                    </Tilt>
                </motion.div>
            </div>
            <LogoSlider />
        </div>
    );
}


