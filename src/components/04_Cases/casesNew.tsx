"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './casesNew.module.css';

const cases = [
    {
        id: 1,
        image: "/images/caseStudyHotelGrey.jpg", 
        company: "RUBY HOTELS",
        description: "Visuelle Gestaltung der kompletten Hotelausstattung von der Bodylotion bis zur Keycard.",
        tags: ["Konzeption", "Werbemittel", "Verpackungsdesign"],
    },
    {
        id: 2,
        image: "/images/caseStudyCat.jpg",
        company: "Kunde Zwei",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tags: ["Branding", "Digital Design", "Animation"],
    },
    {
        id: 3,
        image: "/images/caseStudyBanners.png",
        company: "Dritter Kunde",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tags: ["Print", "Editorial", "Fotografie"],
    },
    {
        id: 4,
        image: "/images/caseStudyMagazineOpen.jpg",
        company: "Case Study Vier",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        tags: ["UX Design", "Webdesign", "Development"],
    },
    {
        id: 5,
        image: "/images/caseStudyMagazineKid.jpg",
        company: "Fünfte Case Study", 
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        tags: ["Illustration", "Motion Design", "Kampagne"],
    },
];




  export default function Cases() {
    const [activeCase, setActiveCase] = useState(cases[0]);
    const ref = React.useRef<HTMLDivElement>(null);

    // Scroll progress tracking for pagination
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"]
  });

    // Motion value for the active dot
    const activeDot = useTransform(
        scrollYProgress,
        // Breakpoints for each case study (adjust based on number of cases)
        [0, 0.2, 0.4, 0.6, 0.8],
        [0, 1, 2, 3, 4]
    );

    // Watch for case changes
    useEffect(() => {
      const unsubscribe = activeDot.on('change', (value) => {
          const currentIndex = Math.floor(value);
          const nextIndex = Math.ceil(value);
          const progress = value - currentIndex;

          // Change active case when next case is 50% expanded
          if (progress >= 0.5 && cases[nextIndex]) {
              setActiveCase(cases[nextIndex]);
          }
          // Add this condition for the first case
          else if (value <= 0.5) {
            setActiveCase(cases[0]);
          }
      });

      return () => unsubscribe();
    }, [activeDot]);
    

    return (
      <div className={styles.outerContainer} ref={ref}>

        <div className={styles.stickyWrapper}>
          {/* Pagination */}
          <div className={styles.paginationWrapper}>
            <div className={styles.pagination}>
                    {cases.map((_, index) => (
                        <div key={index} className={styles.dotContainer}>
                            <div className={styles.dot} />
                            <motion.div 
                                className={styles.activeDot}
                                style={{
                                  opacity: useTransform(
                                    activeDot,
                                        (value) => {
                                            // Calculate the distance from this index
                                            const distance = value - index;
                                            
                                            // For the current dot fading out
                                            if (Math.floor(value) === index && distance > 0) {
                                              // Only start fading when next case is 50% expanded
                                              return distance <= 0.5 ? 1 : 1 - ((distance - 0.5) * 2);
                                            }
                                            // For the next dot fading in
                                            else if (Math.ceil(value) === index && distance < 0) {
                                                // Start fading in when current case is 50% expanded
                                                const nextDistance = 1 + distance;
                                                return nextDistance >= 0.5 ? (nextDistance - 0.5) * 2 : 0;
                                            }
                                            // Fully active dot (when at this index or when next case hasn't reached 50%)
                                            else if (Math.floor(value) === index && distance < 0.5) {
                                                return 1;
                                            }
                                            // Inactive dot
                                            return 0;
                                        }
                                    )
                                }}
                            />
                        </div>
                    ))}
                </div>
          </div>

          {/* Cases Text */}
          <div className={styles.textWrapper}>
                <div className={styles.overlay} />
                <AnimatePresence initial={false}>
                    <motion.div 
                        className={styles.textContainer}
                        key={activeCase.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            duration: 0.1,
                            ease: "linear"
                        }}
                        style={{
                            position: 'absolute',
                            left: 70,
                            bottom: 70
                        }}
                    >
                        <h2 className={`h2 ${styles.h2}`}>{activeCase.company}</h2>
                        <h4 className={`subtitle ${styles.subtitle}`}>{activeCase.description}</h4>
                        <div className={styles.tagRow}>
                            {activeCase.tags.map((tag, index) => (
                                <p key={index} className={`tag ${styles.tag}`}>{tag}</p>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
          </div>
        </div>

        {/* Cases Image Scrolling */}
        <div className={styles.casesContainer}>
            {cases.map((cases, index) => (
                <CaseStudyImage key={cases.id} cases={cases} />
            ))}
        </div>
          
      </div>
  );
}



  const CaseStudyImage = ({ cases }) => {
    const ref = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "start start"]
    });
  
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
    return (
      <motion.div 
        ref={ref}
        style={{
          scaleY,
          transformOrigin: 'top',
          lineHeight: 0,
          fontSize: 0,
        }}
        
      >
        <img 
          className={styles.image}
          src={cases.image} 
          alt={cases.company} 
        />
      </motion.div>
    );
  };