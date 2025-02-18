"use client"; 
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styles from './inner.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Inner({ children }) {

  const pathname = usePathname();

  
  console.log('Current key:', pathname);

  useEffect(() => {
    console.log('Component mounted with pathname:', pathname);
    return () => {
      console.log('Component unmounted with pathname:', pathname);
    };
  }, [pathname]);

  const anim = (variants, name) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  };

  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  const opacity = {
    initial: { 
        opacity: 0 
    },
    enter: { 
        opacity: 1, 
        transition: {
            duration: 3,
            ease: [0.76, 0, 0.24, 1]
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 3,
            ease: [0.76, 0, 0.24, 1]
        }
    }
  };

  const slide = {
    initial: { 
        top: "100vh" 
    },
    exit: { 
        top: "0vh",
        transition: {
            duration: 1,
            ease: [0.76, 0, 0.24, 1]
        }
    },
  };

  const perspective = {
    initial: { 
        y: 0,
        scale: 1,
        opacity: 1,
    },

    exit: { 
        y: -100,
        scale: 0.9,
        opacity: 0.5,
        transition: {
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1]
        }
    },
  };


  return (
    <AnimatePresence mode="wait" key={pathname} exitBeforeEnter>
      <motion.div
          {...anim(slide, "Slide")}
          className={styles.slide}
        />  
          <motion.div {...anim(perspective, "Perspective")} className={styles.page} >
              <motion.div {...anim(opacity, "Opacity")} >
                  {children}
              </motion.div>
          </motion.div>
    </AnimatePresence>
  );
}
