"use client";
import React, { useState, useEffect } from 'react';
import styles from './navigationBar.module.css';
import SVG from 'react-inlinesvg';

// Add this sections array at the top, outside the component


const navItems = [
    { id: 1, title: 'WAS', section: 'services' },
    { id: 2, title: 'WIE', section: 'cases' },
    { id: 3, title: 'WER', section: 'team' },
    { id: 4, title: 'WO', section: 'contact' },
    { id: 5, title: 'LETS TALK', section: 'footer' },
];

export default function NavigationBar() {
    const [navbarBackground, setNavbarBackground] = useState('transparent');
    const [activeSection, setActiveSection] = useState('header');
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [shouldHide, setShouldHide] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollThreshold = 20;
            
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

            const sections = navItems.map(item => ({
                id: item.section,
                element: document.getElementById(item.section)
            }));

            const currentSection = sections.find(section => {
                if (!section.element) return false;
                const rect = section.element.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
            
            
        };



        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, shouldHide]);


    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`
            ${styles.navbar} 
            ${shouldHide ? (visible ? styles.visible : styles.hidden) : ''}
            ${isFixed ? styles.fixed : ''}
        `}>
            <div className={styles.logo}>
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