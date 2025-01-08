"use client";
import React, { useState, useEffect } from 'react';
import styles from './navigationBar.module.css';
import SVG from 'react-inlinesvg';



const navItems = [
    
    { id: 1, title: 'WAS', section: 'services' },
    { id: 2, title: 'WIE', section: 'cases' },
    { id: 3, title: 'WER', section: 'team' },
    { id: 4, title: 'WO', section: 'contact' },
    { id: 5, title: 'LETS TALK', section: 'footer' },
];

export default function NavigationBar({ parallaxContainerClass }) {
    const [activeSection, setActiveSection] = useState('header');
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [shouldHide, setShouldHide] = useState(false);
    // Store initial positions
    const [initialPositions, setInitialPositions] = useState({});


    // Capture initial positions on mount, accounting for any offsets
    useEffect(() => {
        const positions = {};
        navItems.forEach(item => {
            const element = document.getElementById(item.section);
            if (element) {
                // Get the exact position without any offset
                const rect = element.getBoundingClientRect();
                positions[item.section] = window.scrollY + rect.top;
            }
        });
        setInitialPositions(positions);
    }, []); 

    // Handle scroll behavior for showing/hiding navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollThreshold = 10;

            // Only start hiding/showing after scrolling past the first viewport
            if (currentScrollPos > window.innerHeight) {
                setShouldHide(true);
                setIsFixed(true);
            } else {
                setShouldHide(false);
                setIsFixed(false);
            }
            
            if (shouldHide) {
                // Only show navbar if scrolled up more than threshold
                if (prevScrollPos - currentScrollPos > scrollThreshold) {
                    setVisible(true);
                } else if (currentScrollPos > prevScrollPos) {
                    // Hide immediately when scrolling down
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

    // Scroll to section smoothly and set the active section
    const scrollToSection = (section) => {
        if (window.lenis && initialPositions[section] !== undefined) {
            const targetY = initialPositions[section];
            const currentScroll = window.scrollY;
            const isScrollingUp = targetY < currentScroll;
            
            const distance = Math.abs(currentScroll - targetY);
            const baseDuration = isScrollingUp ? 2.0 : 1.6;
            const duration = Math.min(baseDuration + (distance / 6000), 2.8);

            window.lenis.scrollTo(targetY, {
                offset: 75,
                duration: duration,
                easing: (t) => {
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
    };

    const scrollToTop = () => {
        if (window.lenis) {
            window.lenis.scrollTo(0, {
                duration: 2.0,
                easing: (t) => {
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
      
      

  // Update the active section based on scroll position
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


 
    return (
        <nav className={`
            ${styles.navbar} 
            ${shouldHide ? (visible ? styles.visible : styles.hidden) : ''}
            ${isFixed ? styles.fixed : ''}
            ${visible && isFixed ? styles.solid : styles.transparent}
        `}>
            <div 
            className={styles.logo}
            onClick={scrollToTop}
            >
                <SVG src="/logos/kopfbrand.svg" />
            </div>
            <div className={styles.navItems}>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`button ${styles.button} ${activeSection === item.section ? styles.active : ''}`}
                        onClick={() => scrollToSection(item.section)}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </nav>
    );

}