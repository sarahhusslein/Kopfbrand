"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./screenLoader.module.css";
import SVG from 'react-inlinesvg';


export default function ScreenLoader({ children }) {

  /***************************** 
  State Declarations
  *****************************/
  const [loading, setLoading] = useState(true);

  /***************************** 
  Animations
  *****************************/
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  
  /***************************** 
  Render
  *****************************/
  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {loading ? (
            <motion.div
                key="loader"
                className={styles.loaderContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                
                {/****** Logo ******/}
                <motion.div 
                    className={styles.logoContainer}
                    initial={{ y: 0 }}
                    exit={{ y: 0, opacity: 0.1, scale: 0.7 }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1]}}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, }}
                        style={{ transformOrigin: 'center' }}
                    >
                        <SVG aria-label="Kopfbrand Logo" src="/logos/kopfbrand.svg" className={styles.logo}/>
                    </motion.div>
                    <div className={styles.textContainer}>

                        {/****** Handwriting ******/}
                        <motion.p
                            className={`handschrift ${styles.handschrift}`}
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                transition: {
                                    staggerChildren: 0.05, 
                                    delayChildren: 0.7,
                                    
                                },
                                },
                            }}
                            >
                            {"immer eins mehr".split("").map((char, index) => (
                                <motion.span
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                {char}
                                </motion.span>
                            ))}
                        </motion.p>
                    </div>
                </motion.div>
            </motion.div>
            ) : (
            <motion.div
                key="content"
                className={styles.contentWrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {children}
            </motion.div>
            )}
      </AnimatePresence>
    </div>
    
  );
}