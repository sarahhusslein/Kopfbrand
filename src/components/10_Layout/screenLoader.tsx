"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./screenLoader.module.css";
import SVG from 'react-inlinesvg';


export default function ScreenLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
            <>
                <motion.div 
                    className={styles.slide} 
                    initial={{ top: "100vh" }}
                    animate={{ top: "100vh" }}
                    exit={{ top: "0vh" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.div
                    key="loader"
                    className={styles.container}
                >
                    <motion.div 
                        className={styles.logoContainer}
                        initial={{ y: 0 }}
                        exit={{ y: "-100vh" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, }}
                            style={{ transformOrigin: 'center' }}
                        >
                            <SVG aria-label="Kopfbrand Logo" src="/logos/kopfbrand.svg" className={styles.logo}/>
                        </motion.div>
                        <div className={styles.textContainer}>
                            <motion.p
                                className={`handschrift ${styles.handschrift}`}
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: {
                                    transition: {
                                        staggerChildren: 0.05, 
                                        delayChildren: 1,
                                        
                                    },
                                    },
                                }}
                                >
                                {"Immer eins mehr".split("").map((char, index) => (
                                    <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                    {char}
                                    </motion.span>
                                ))}
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            </>
            ) : (
            <motion.div
                key="content"
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // transition={{ duration: 1 }}
            >
                {children}
            </motion.div>
            )}
    </AnimatePresence>
</>
    
  );
}