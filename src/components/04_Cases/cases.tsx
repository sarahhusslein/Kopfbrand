"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'; 
import SVG from 'react-inlinesvg';
import Tilt from 'react-parallax-tilt';
import styles from './cases.module.css';

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
        image: "/images/caseStudyWall.jpg",
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
    const [showFirstImage, setShowFirstImage] = useState(true);
    const [showFirstContent, setShowFirstContent] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 }); 

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

            if (progress >= 0.5 && cases[nextIndex]) {
                setActiveCase(cases[nextIndex]);
            }
            else if (value <= 0.5) {
                setActiveCase(cases[0]);
            }
        });

        return () => unsubscribe();
    }, [activeDot]);
    
    useEffect(() => {
        const handleImageScaled = (event: CustomEvent) => {
            if (event.detail.image === "/images/caseStudyHotelGrey.jpg") {
                setShowFirstImage(false);
                setTimeout(() => {
                    setShowFirstContent(true);
                }, 300);
            }
        };

        window.addEventListener('imageFullyScaled', handleImageScaled as EventListener);
        return () => {
            window.removeEventListener('imageFullyScaled', handleImageScaled as EventListener);
        };
    }, []);

  
    const handleDotClick = (index: number) => {
        if (typeof window !== 'undefined') { 
            const containerHeight = ref.current?.offsetHeight || 0;
            const scrollPosition = (containerHeight * index * 0.2);
            const containerTop = ref.current?.getBoundingClientRect().top || 0;
            const currentScroll = window.scrollY;
            
            const targetScroll = currentScroll + containerTop + scrollPosition;
            
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div>
            <div className={styles.outerContainer} ref={ref}>
                <div className={styles.stickyWrapper}>
                    {/* Pagination */}
                    <div className={styles.paginationWrapper}>
                        <div className={styles.pagination}>
                            {cases.map((_, index) => {
                                const dotOpacity = useTransform(
                                    activeDot,
                                    (value) => {
                                        if (index === 0 && !showFirstContent) return 0;
                                        
                                        const distance = value - index;
                                        if (Math.floor(value) === index && distance > 0) {
                                            return distance <= 0.5 ? 1 : 1 - ((distance - 0.5) * 2);
                                        }
                                        else if (Math.ceil(value) === index && distance < 0) {
                                            const nextDistance = 1 + distance;
                                            return nextDistance >= 0.5 ? (nextDistance - 0.5) * 2 : 0;
                                        }
                                        else if (Math.floor(value) === index && distance < 0.5) {
                                            return 1;
                                        }
                                        return 0;
                                    }
                                );

                                return (
                                    <div 
                                        key={index} 
                                        className={styles.dotContainer}
                                        onClick={() => handleDotClick(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className={styles.dot} />
                                        <motion.div 
                                            className={styles.activeDot}
                                            style={{ opacity: dotOpacity }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Cases Text */}
                    <div className={styles.textWrapper}>
                        {isMobile ? (
                            <div className={styles.overlay}>
                                <AnimatePresence initial={false}>
                                    <motion.div 
                                        className={styles.textContainer}
                                        key={activeCase.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ 
                                            opacity: activeCase.id === 1 && !showFirstContent ? 0 : 1 
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{ 
                                            duration: 0.5,
                                            ease: "easeOut"
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
                        ) : (
                            <Tilt 
                                tiltMaxAngleX={5} 
                                tiltMaxAngleY={5} 
                                glareEnable={true} 
                                glareBorderRadius='25px' 
                                className={styles.overlay}
                            >
                                <AnimatePresence initial={false}>
                                    <motion.div 
                                        className={styles.textContainer}
                                        key={activeCase.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ 
                                            opacity: activeCase.id === 1 && !showFirstContent ? 0 : 1 
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{ 
                                            duration: 0.5,
                                            ease: "easeOut"
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
                            </Tilt>
                        )}
                    </div>
                </div>

                {/* Cases Image Scrolling */}
                <div className={styles.casesContainer} >
                    {cases.map((caseItem, index) => (
                        <CaseStudyImage 
                            key={caseItem.id} 
                            cases={caseItem}
                            isFirstCase={index === 0}
                            showFirstImage={showFirstImage}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.emptyContainer}></div>
        </div>
    );
}

const CaseStudyImage = ({ cases, isFirstCase, showFirstImage }) => {
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
                opacity: isFirstCase && !showFirstImage ? 0 : 1,
                transition: 'scaleY 0.5s ease',
                willChange: 'transform'
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut"
            }}
            dragElastic={0.2}
            dragConstraints={{ left: 0, right: 100, top: 0, bottom: 100 }}
        >
            <img 
                className={styles.image}
                src={cases.image} 
                alt={cases.company} 
            />
        </motion.div>
    );
};