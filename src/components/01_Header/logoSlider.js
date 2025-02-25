"use client"
import { useMediaQuery } from 'react-responsive';
import styles from './logoSlider.module.css';
import SVG from 'react-inlinesvg';
import Marquee from "react-fast-marquee";



/***************************** 
Type Declarations and Arrays
*****************************/
// 🟢 Elements array
const elements = [
    {icon: '/logos/powerbar.svg', height: { mobile: '25px', default: '30px', largeDesktop: '35px' }},
    {icon: '/logos/pons.svg', height: { mobile: '25px', default: '30px', largeDesktop: '35px' }},
    {icon: '/logos/langenscheidt.svg', height: { mobile: '50px', default: '65px', largeDesktop: '70px' }},
    {icon: '/logos/wiedemann.svg', height: { mobile: '30px', default: '40px', largeDesktop: '45px' }},
    {icon: '/logos/adidas.svg', height: { mobile: '30px', default: '30px', largeDesktop: '35px' }},
    {icon: '/logos/rubyWorkspaces.svg', height: { mobile: '50px', default: '50px', largeDesktop: '55px' }},
    {icon: '/logos/rubyHotels.svg', height: { mobile: '50px', default: '50px', largeDesktop: '55px' }},
    {icon: '/logos/deloitte.svg', height: { mobile: '25px', default: '25px', largeDesktop: '25px' }},
    {icon: '/logos/o2.svg', height: { mobile: '30px', default: '30px', largeDesktop: '35px' }},
    {icon: '/logos/greencity.svg', height: { mobile: '25px', default: '30px', largeDesktop: '35px' }},
    {icon: '/logos/apeFactory.svg', height: { mobile: '25px', default: '30px', largeDesktop: '35px' }},
    {icon: '/logos/freieDigitale.svg', height: { mobile: '25px', default: '20px' }},
    {icon: '/logos/berlitz.svg', height: { mobile: '30px', default: '30px', largeDesktop: '35px' }},
    {icon: '/logos/sisley.svg', height: { mobile: '30px', default: '30px', largeDesktop: '35px' }},
];



export default function LogoSlider() {

    /***************************** 
    State Declarations
    *****************************/
    // 🟢 States, Refs and Device Types
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isLargeDesktop = useMediaQuery({ minWidth: 1920 });

    /***************************** 
    Render
    *****************************/
    return (
        <div className={styles.marqueeWrapper}>
            <Marquee 
                speed={isMobile ? 60 : 40}
                gradient={false}
                pauseOnHover={true}
                play={true}
                loop={0}
                delay={0}
            >
                <div className={styles.marqueeContent}>
                    {elements.map((element, index) => (
                        <div key={`first-${index}`} className={styles.iconContainer}>
                            <SVG
                                aria-label={`Logo von ${element.icon.split('/').pop().split('.').shift()}`}
                                src={element.icon}
                                className={styles.icon}
                                style={{ 
                                    height: isLargeDesktop ? element.height.largeDesktop : 
                                            isMobile ? element.height.mobile : 
                                            element.height.default 
                                }}
                            />
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
}