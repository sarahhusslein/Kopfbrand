"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Tilt from 'react-parallax-tilt';
import styles from './navigationBar.module.css';
import SVG from 'react-inlinesvg';



/***************************** 
Type Declarations
*****************************/
// 🟢 Types for the navigation items
interface NavItem {
    id: number;
    title: string;
    section: string;
  }

  const navItems: NavItem[] = [
    { id: 1, title: 'WAS', section: 'services' },
    { id: 2, title: 'WIE', section: 'cases' },
    { id: 3, title: 'WER', section: 'team' },
    { id: 4, title: 'WO', section: 'contact' },
    { id: 5, title: 'LETS TALK', section: 'footer' },
  ];

  const sectionOffsetsDesktop: Record<string, number> = {
    services: 150,  // "WAS"
    cases: 100,     // "WIE"
    team: 150,      // "WER" 
    contact: 200,   // "WO"
    footer: 0,    // "LETS TALK"
  };

  const sectionOffsetsMobile: Record<string, number> = {
    services: 40,
    cases: 100,
    team: 150,
    contact: 170,
    footer: 80,
  };



export default function NavigationBar() {

    /***************************** 
    State Declarations
    *****************************/
    // 🟢 States and Device Types
    const [activeSection, setActiveSection] = useState<string>('header');
    const [visible, setVisible] = useState<boolean>(true);
    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
    const [isFixed, setIsFixed] = useState<boolean>(false);
    const [shouldHide, setShouldHide] = useState<boolean>(false);
    const [initialPositions, setInitialPositions] = useState<Record<string, number>>({});
    const isMobile = useMediaQuery({ maxWidth: 768 });



    /***************************** 
    Initial Positions
    *****************************/
    // 🟢 Capture initial positions on mount, accounting for any offsets
    useEffect(() => {
        const positions: Record<string, number> = {};
        navItems.forEach(item => {
            const element = document.getElementById(item.section);
            if (element) {
                const rect = element.getBoundingClientRect();
                positions[item.section] = element.offsetTop;
            }
        });
        setInitialPositions(positions);
    }, []); 



    /***************************** 
    Scroll Behavior
    *****************************/
    // 🟢 Handle scroll behavior for showing/hiding navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollThreshold = 10;

            // 🟢 Only start hiding/showing after scrolling past the first viewport
            if (currentScrollPos > window.innerHeight) {
                setShouldHide(true);
                setIsFixed(true);
            } else {
                setShouldHide(false);
                setIsFixed(false);
            }
            
            if (shouldHide) {
                // 🟢 Only show navbar if scrolled up more than threshold
                if (prevScrollPos - currentScrollPos > scrollThreshold) {
                    setVisible(true);
                } else if (currentScrollPos > prevScrollPos) {
                    // 🟢 Hide immediately when scrolling down
                    setVisible(false);
                }
            }

            setPrevScrollPos(currentScrollPos);
            };

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos, shouldHide]);

    // 🟢 Scroll to section smoothly and set the active section
    const scrollToSection = (section: string) => {
        if ((window as any).lenis) {
            if (section === 'footer') {
                // 🔽 Ganz ans Seitenende scrollen
                (window as any).lenis.scrollTo(document.body.scrollHeight, {
                    duration: 2.0,
                    easing: (t: number) => {
                        const ts = t * t;
                        const tc = ts * t;
                        return t < 0.25
                            ? 3.5 * ts
                            : 1 - (1 - t) * (1 - t) * (1 - t);
                    },
                    lock: true,
                    immediate: false,
                    onComplete: () => {
                        setActiveSection(section);
                    }
                });
                return;
            }
    
            // 🔁 Normaler Ablauf für andere Sections
            const element = document.getElementById(section);
            if (element ) {
                const targetY = element.offsetTop;
                const currentScroll = window.scrollY;
                const isScrollingUp = targetY < currentScroll;
                const distance = Math.abs(currentScroll - targetY);
                const baseDuration = isScrollingUp ? 2.0 : 1.6;
                const duration = Math.min(baseDuration + (distance / 6000), 2.8);
    
                ((window as any).lenis).scrollTo(targetY, {
                    offset: isMobile 
                        ? (sectionOffsetsMobile[section] ?? 60) 
                        : (sectionOffsetsDesktop[section] ?? 75),
                    duration: duration,
                    easing: (t: number) => {
                        const ts = t * t;
                        const tc = ts * t;
    
                        if (isScrollingUp) {
                            return t < 0.35
                                ? 4 * tc
                                : 1 - Math.pow(1 - t, 4);
                        } else {
                            return t < 0.25
                                ? 3.5 * ts
                                : 1 - (1 - t) * (1 - t) * (1 - t);
                        }
                    },
                    lock: true,
                    immediate: false,
                    onComplete: () => {
                        setActiveSection(section);
                    }
                });
            }
        }
    };

    // 🟢 Scroll to top
    const scrollToTop = () => {
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, {
                duration: 2.0,
                easing: (t: number) => {
                    const ts = t * t;
                    const tc = ts * t;
                    // Use the upward scrolling easing for consistency
                    return t < 0.35
                        ? 4 * tc
                        : 1 - Math.pow(1 - t, 4);
                },
                lock: true,
                immediate: false,
                onComplete: () => {
                    setActiveSection('header');
                }
            });
        }
    };
      
    
    // 🟢 Update the active section based on scroll position
    useEffect(() => {
        const handleSectionChange = () => {
        const scrollPos = window.scrollY;

        navItems.forEach((item) => {
            const section = document.getElementById(item.section);
            if (section) {
            const offsetTop = section.offsetTop;
            const offsetHeight = section.offsetHeight;

            // If the scroll position is within the current section
            if (scrollPos >= offsetTop - 50 && scrollPos < offsetTop + offsetHeight - 50) {
                setActiveSection(item.section);
            }
            }
        });
        };

        window.addEventListener("scroll", handleSectionChange);

        return () => {
            window.removeEventListener("scroll", handleSectionChange);
        };
    }, []);



    /***************************** 
    Animations
    *****************************/
    // 🟢 Animation Declarations
    const DURATION = 0.3;
    const STAGGER = 0;


    // 🟢 Function to render nav items
    const renderNavItems = () => (
        <motion.div 
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className={styles.navItems}
        >
            {/****** Buttons ******/}
            {navItems.map((item) => (
                <motion.button 
                    key={item.id}
                    className={`button ${styles.button} ${activeSection === item.section ? styles.active : ''}`}
                    onClick={() => scrollToSection(item.section)}
                    onTouchStart={() => scrollToSection(item.section)}
                    whileHover="hovered"
                    initial="initial"
                >
                    {/****** Animated Text ******/}
                    <motion.div className={styles.animatedText}>
                        <div className={styles.textWrapper}>
                            {item.title.split('').map((letter, index) => (
                                <motion.span 
                                    key={index} 
                                    variants={{
                                        initial: { y: 0 },
                                        hovered: { y: "-100%" },
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index,
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </div>
                        <div className={styles.hoverText}>
                            {item.title.split('').map((letter, index) => (
                                <motion.span 
                                    key={index} 
                                    variants={{
                                        initial: { y: "100%" },
                                        hovered: { y: 0 },
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index,
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </motion.button>
            ))}
        </motion.div>
    );


    /***************************** 
    Render
    *****************************/
    return (
        <nav 
            className={`
                ${styles.navbar} 
                ${shouldHide ? (visible ? styles.visible : styles.hidden) : ''}
                ${isFixed ? styles.fixed : ''}
                ${visible && isFixed ? styles.solid : styles.transparent}
            `} >

            {/****** Logo ******/}
            <motion.div 
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                className={styles.logo}
                onClick={scrollToTop}
            >
                <SVG aria-label="Kopfbrand Logo" src="/logos/kopfbrand.svg" />
            </motion.div>

            {/****** Nav Items ******/}
            {!isMobile ? (
                <Tilt
                    tiltMaxAngleX={7} 
                    tiltMaxAngleY={5} 
                    glareEnable={false}
                    transitionSpeed={1000} 
                    transitionEasing='cubic-bezier(0.1, 1, 0.1, 1)'
                    perspective={1000} 
                >
                    {renderNavItems()}
                </Tilt>
            ) : (
                renderNavItems()
            )}

        </nav>
    );

}