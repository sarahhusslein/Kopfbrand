"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef } from "react";
import styles from "./transition.module.css";
 

/***************************** 
Helper Functions
*****************************/
// 🟢 Previous Value
function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T>();
 
  useEffect(() => {
    prevValue.current = value;
    return () => {
      prevValue.current = undefined;
    };
  });
 
  return prevValue.current;
}


/***************************** 
FrozenRouter
*****************************/
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;
 
  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);
 
  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined;
 
  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}
 


/***************************** 
Animations
*****************************/
// 🟢 Animated Component
const anim = (variants, name) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};



// 🟢 Opacity Animation
const opacity = {
  initial: { 
      opacity: 0 
  },
  enter: { 
      opacity: 1, 
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1 // Add a small delay to ensure slide animation completes first
  },
  exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }
};

// 🟢 Slide Exit Animation
const slideExit = {
  initial: { 
      top: "100vh" 
  },
  enter: { 
    top: "100vh" 
  },
  exit: { 
      top: "0vh",
      transition: {
          duration: 0.3,
          ease: [0.76, 0, 0.24, 1]
      }
  },
};

// 🟢 Slide Enter Animation
const slideEnter = {
  initial: { 
      top: "0vh" 
  },
  enter: { 
    top: "-100vh",
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1]
  }
  },
  exit: { 
      top: "-100vh",
  },
};

// 🟢 Perspective Animation
const perspective = {
  initial: { 
      y: 0,
      scale: 1,
      opacity: 1,
  },

  enter: { 
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1]
    }
},

  exit: { 
      y: -100,
      scale: 0,
      opacity: 0,
      transition: {
          duration: 0.3,
          ease: [0.76, 0, 0.24, 1]
      }
  },
};



/***************************** 
Render
*****************************/
const Transition = ({children} : {children: React.ReactNode}) => {
  const segment = useSelectedLayoutSegment();
 
  return (
    <AnimatePresence mode="wait" >
      <motion.div
        key={segment}
        className={styles.inner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className={styles.slide} {...anim(slideExit, "SlideExit")}/>
        <motion.div className={styles.slide} {...anim(slideEnter, "SlideEnter")} />
        <motion.div className={styles.page} {...anim(perspective, "Perspective")}>
          <motion.div {...anim(opacity, "Opacity")}>
            <FrozenRouter>{children}</FrozenRouter>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;