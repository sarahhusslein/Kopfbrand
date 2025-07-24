"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'; 
import SVG from 'react-inlinesvg';
import Tilt from 'react-parallax-tilt';
import styles from './cases.module.css';



/***************************** 
Type Declarations and Arrays
*****************************/
// 🟢 Cases array
const cases = [
    {
        id: 1,
        image: "/images/caseStudyHotelGrey.jpg", 
        imageMobile: "/images/caseStudyHotelGreyMobile.jpg",
        company: "RUBY HOTELS & WORKSPACES",
        description: "Seit über 12 Jahren begleiten wir die Marke RUBY beim Aufbau und der Weiterentwicklung ihres visuellen Markenauftritts, vom ersten Logo bis zum aktuellen Corporate Design. Aktuell betreuen wir 21 Hotels und 8 Workspaces der RUBY Gruppe und verantworteten die gesamte Markenkommunikation, inklusive Collaterals, Büroausstattungen, Kampagnen, Printanzeigen und Out-of-Home-Maßnahmen in Europa.",
        services: "KONZEPTION . CORPORATE DESIGN . BRANDING . PACKAGING . PRODUKTION",
        tags: ["KONZEPTION", "CORPORATE DESIGN", "BRANDING", "PACKAGING", "PRODUKTION"],
    },
    {
        id: 2,
        image: "/images/caseStudyPons.jpg",
        imageMobile: "/images/caseStudyPonsMobile.jpg",
        company: "PONS LANGENSCHEIDT GMBH",
        description: "Seit 2010 entwickeln wir für PONS und LANGENSCHEIDT aufmerksamkeitsstarke Kampagnen, die Sprache sprechen – visuell und inhaltlich. Für die jährliche Plakatkampagne in Deutschland, Österreich und der Schweiz übernehmen wir Konzeption von Text und Bild. Zudem gestalten wir verkaufsstarke POS-Aufsteller mit klarer Botschaft, markenpräzisem Design und Gespür für den Moment.",
        services: "KONZEPTION . WORDING . BILDBEARBEITUNG . FOTOSHOOTING",
        tags: ["Branding", "Digital Design", "Animation"],
    },
    {
        id: 3,
        image: "/images/caseStudyLangenscheidt.jpg",
        imageMobile: "/images/caseStudyLangenscheidtMobile.jpg", 
        company: "LANGENSCHEIDT VERLAG",
        description: "Von 2009 bis 2019 begleiteten wir den LANGENSCHEIDT Verlag bei der Weiterentwicklung seiner Programme „Sprachen“ und „Entertainment“. Wir gestalteten zahlreiche Buchcover, darunter das humorvolle Werk „Katze-Deutsch, Deutsch-Katze“, das 2011 in die Top 10 der SPIEGEL-Bestsellerliste einstieg. Zudem entwickelten wir das visuelle Erscheinungsbild aller Verlagsvorschauen neu und setzten die Kinder- und Jugendbuchvorschauen vollständig um.",
        services: "KONZEPTION . EDITORIAL . SATZ . DRUCKVORSTUFE",
        tags: ["Print", "Editorial", "Fotografie"],
    },
    {
        id: 4,
        image: "/images/caseStudyRubyPhone.jpg",
        imageMobile: "/images/caseStudyRubyPhoneMobile.jpg",
        company: "RUBY GMBH",
        description: "Seit Gründung entwickeln wir für die RUBY GmbH wirkungsvolle Social-Media-Kampagnen und digitale Content-Strategien, um die Markenbekanntheit nachhaltig zu steigern. Im Fokus stehen kreative Ideen, die auffallen, relevante Inhalte und ein einheitlicher Markenauftritt über alle digitalen Kanäle hinweg.",
        services: "KONZEPTION . ANIMATION . CONTENTERSTELLUNG ",
        tags: ["UX Design", "Webdesign", "Development"],
    },
    {
        id: 5,
        image: "/images/caseStudyLBV.jpg",
        imageMobile: "/images/caseStudyLBVMobile.jpg",
        company: "LBV LANDESBUND FÜR VOGELSCHUTZ", 
        description: "Seit über 15 Jahren begleiten wir den LBV – Landesbund für Vogelschutz (Kreisgruppe München) bei der Entwicklung wirkungsvoller Kommunikationsmittel im Umwelt- und Naturschutz. Wir erstellen Broschüren, Schautafeln, Ratgeber und betreuen die reichweitenstarke Newsletter-Kampagne. Unsere Leistungen umfassen Planung, Gestaltung, Umsetzung und fundierte Datenauswertung der vierteljährlichen Kampagne.",
        services: "KONZEPTION . BRANDING . ONLINE-MARKETING . E-MAIL-MARKETING",
        tags: ["Illustration", "Motion Design", "Kampagne"],
    },
];



  export default function Cases() {

    /***************************** 
    State Declarations
    *****************************/
    // 🟢 States, Refs and Device Types
    const [activeCase, setActiveCase] = useState(cases[0]);
    const [showFirstImage, setShowFirstImage] = useState(true);
    const [showFirstContent, setShowFirstContent] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 }); 


    /***************************** 
    Animations
    *****************************/
    // 🟢 Scroll progress tracking for pagination
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // 🟢 Motion value for the active dot
    const activeDot = useTransform(
        scrollYProgress,
        // 🟢 Breakpoints for each case study (adjust based on number of cases)
        [0, 0.2, 0.4, 0.6, 0.8],
        [0, 1, 2, 3, 4]
    );

    // 🟢 Watch for case changes
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
    
    // 🟢 Effect to handle image scaling
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


    /***************************** 
    Functions
    *****************************/
    // 🟢 Function to handle dot click
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


    /***************************** 
    Render
    *****************************/
    return (
        <div>
            <div className={styles.outerContainer} ref={ref}>
                <div className={styles.stickyWrapper}>

                    {/****** Pagination ******/}
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

                    {/****** Cases Text ******/}
                    <div className={styles.textWrapper}>
                        {isMobile ? (
                            <div className={styles.overlay}>
                                <AnimatePresence initial={false}>
                                    <motion.div 
                                        className={styles.textContainer}
                                        key={activeCase.id}
                                        initial={{ opacity: 0, }}
                                        animate={{ 
                                            opacity: activeCase.id === 1 && !showFirstContent ? 0 : 1,
                                        }}
                                        exit={{ 
                                            opacity: 0, 
                                             }}
                                        transition={{ 
                                            duration: 0.5,
                                            ease: "easeInOut"
                                        }}
                                        style={{
                                            position: 'absolute',
                                            left: 70,
                                            bottom: 70
                                        }}
                                    >
                                        <motion.h3 
                                            className={`h3 ${styles.h2}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                                {activeCase.company}
                                        </motion.h3>
                                        <motion.h4 
                                            className={`body ${styles.body}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            {activeCase.description}
                                        </motion.h4>
                                        <motion.div 
                                            className={`body ${styles.bodyServices}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            {activeCase.services}
                                        </motion.div>
                                        {/* <motion.div 
                                            className={styles.tagRow}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            {activeCase.tags.map((tag, index) => (
                                                <p key={index} className={`tag ${styles.tag}`}>{tag}</p>
                                            ))}
                                        </motion.div> */}
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
                                        initial={{ opacity: 0, }}
                                        animate={{ 
                                            opacity: activeCase.id === 1 && !showFirstContent ? 0 : 1,
                                        }}
                                        exit={{ 
                                            opacity: 0, 
                                             }}
                                        transition={{ 
                                            duration: 0.5,
                                            ease: "easeInOut"
                                        }}
                                        style={{
                                            position: 'absolute',
                                            left: 70,
                                            bottom: 70
                                        }}
                                    >
                                        <motion.h3 
                                            className={`h3 ${styles.h2}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                                {activeCase.company}
                                        </motion.h3>
                                        <motion.div 
                                            className={`body ${styles.body}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            {activeCase.description}
                                        </motion.div>
                                        <motion.div 
                                            className={`body ${styles.bodyServices}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            {activeCase.services}
                                        </motion.div>
                                        {/* <motion.div 
                                            className={styles.tagRow}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            {activeCase.tags.map((tag, index) => (
                                                <p key={index} className={`tag ${styles.tag}`}>{tag}</p>
                                            ))}
                                        </motion.div> */}
                                    </motion.div>
                                </AnimatePresence>
                            </Tilt>
                        )}
                    </div>
                </div>

                {/****** Cases Image Scrolling ******/}
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



/***************************** 
Single Case Study Image
*****************************/
const CaseStudyImage = ({ cases, isFirstCase, showFirstImage }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 }); 

    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });
  
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    
    return (
        <motion.div 
            ref={ref}
            style={{
                scaleY: isMobile ? `none` : scaleY,
                transformOrigin: 'top',
                lineHeight: 0,
                fontSize: 0,
                opacity: isFirstCase && !showFirstImage ? 0 : 1,
            }}
        >
            <img 
                aria-label={`Bild von ${cases.company}`}
                className={styles.image}
                src={isMobile && cases.imageMobile ? cases.imageMobile : cases.image} 
                alt={cases.company} 
            />
        </motion.div>
    );
};