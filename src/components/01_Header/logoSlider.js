"use client"
import { useMediaQuery } from 'react-responsive';
import styles from './logoSlider.module.css';
import SVG from 'react-inlinesvg';
import Marquee from "react-fast-marquee";

const elements = [
    {icon: '/logos/powerbar.svg', height: { mobile: '25px', default: '30px' }},
    {icon: '/logos/pons.svg', height: { mobile: '25px', default: '30px' }},
    {icon: '/logos/langenscheidt.svg', height: { mobile: '50px', default: '65px' }},
    {icon: '/logos/wiedemann.svg', height: { mobile: '30px', default: '40px' }},
    {icon: '/logos/adidas.svg', height: { mobile: '30px', default: '30px' }},
    {icon: '/logos/rubyWorkspaces.svg', height: { mobile: '50px', default: '50px' }},
    {icon: '/logos/rubyHotels.svg', height: { mobile: '50px', default: '50px' }},
    {icon: '/logos/deloitte.svg', height: { mobile: '25px', default: '25px' }},
    {icon: '/logos/o2.svg', height: { mobile: '30px', default: '30px' }},
    {icon: '/logos/greencity.svg', height: { mobile: '25px', default: '30px' }},
    {icon: '/logos/apeFactory.svg', height: { mobile: '25px', default: '30px' }},
    {icon: '/logos/freieDigitale.svg', height: { mobile: '25px', default: '20px' }},
    {icon: '/logos/berlitz.svg', height: { mobile: '30px', default: '30px' }},
    {icon: '/logos/sisley.svg', height: { mobile: '30px', default: '30px' }},
];


export default function LogoSlider() {

    const isMobile = useMediaQuery({ maxWidth: 768 });

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
                                src={element.icon}
                                className={styles.icon}
                                style={{ height: isMobile ? element.height.mobile : element.height.default }}
                            />
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
}