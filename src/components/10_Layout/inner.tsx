"use client"; 
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './inner.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Inner({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const pathname = usePathname();
  const [displayedPath, setDisplayedPath] = useState(pathname);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isExiting) {
      const timeout = setTimeout(() => {
        setDisplayedPath(pathname);
        setIsExiting(false);
      }, 300); // Exit-Animation Dauer

      return () => clearTimeout(timeout);
    }
  }, [isExiting, pathname]);

  const handleNavigation = (newPath: string) => {
    setIsExiting(true);
    setTimeout(() => router.push(newPath), 300); // Navigieren nach Exit-Animation
  };

  // 🛠️ Automatisch alle internen <Link>-Klicks abfangen
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return; // Externe Links ignorieren

      e.preventDefault();
      handleNavigation(href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  const anim = (variants, name) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  };



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
    <AnimatePresence mode="wait">
      <motion.div
        key={displayedPath}
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
