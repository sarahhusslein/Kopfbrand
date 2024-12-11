"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import { motion, useScroll, useTransform } from 'framer-motion';
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
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
    {
        id: 3,
        image: "/images/caseStudyBanners.png",
        company: "Dritter Kunde",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
    {
        id: 4,
        image: "/images/caseStudyMagazineOpen.jpg",
        company: "Case Study Vier",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
    {
        id: 5,
        image: "/images/caseStudyMagazineKid.jpg",
        company: "Fünfte Case Study",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
  
  ];


  export default function Cases() {
    const [activeIndex, setActiveIndex] = useState(0);
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
    
  


    return (
      <div className={styles.outerContainer} ref={ref}>
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

          {/* Cases Image Scrolling */}
          <div className={styles.casesContainer}>
              {cases.map((cases, index) => (
                  <CaseStudyImage key={cases.id} cases={cases} />
              ))}
          </div>

          {/* Cases Text */}
          
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