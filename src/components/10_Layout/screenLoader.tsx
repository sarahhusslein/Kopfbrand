"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./screenLoader.module.css";
import SVG from "react-inlinesvg";

export default function ScreenLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  // Nur beim ersten Render → nach Delay (Animation fertig) Loader ausblenden
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Dauer deiner Gesamtanimation (~0.7s + 1.8s)

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={styles.loaderWrapper}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div 
              className={styles.logoContainer}
              initial={{ y: 0 }}
              exit={{ y: 0, opacity: 0.1, scale: 0.7 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                style={{ transformOrigin: 'center' }}
              >
                <SVG aria-label="Kopfbrand Logo" src="/logos/kopfbrand.svg" className={styles.logo} />
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
        )}
      </AnimatePresence>

      {/* Seiteninhalt wird nie unterbrochen oder beeinflusst */}
      <div className={styles.content}>
        {children}
      </div>
    </>
  );
}
