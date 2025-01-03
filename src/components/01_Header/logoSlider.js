import React from "react";
import styles from './logoSlider.module.css';
import SVG from 'react-inlinesvg';
import Marquee from "react-fast-marquee";

const elements = [
    {icon: '/logos/powerbar.svg', height: '30px' },
    {icon: '/logos/pons.svg', height: '30px' },
    {icon: '/logos/langenscheidt.svg', height: '65px' },
    {icon: '/logos/wiedemann.svg', height: '40px' },
    {icon: '/logos/adidas.svg', height: '30px' },
    {icon: '/logos/rubyWorkspaces.svg', height: '50px' },
    {icon: '/logos/rubyHotels.svg', height: '50px' },
    {icon: '/logos/deloitte.svg', height: '25px' },
    {icon: '/logos/o2.svg', height: '30px' },
    {icon: '/logos/greencity.svg', height: '30px' },
    {icon: '/logos/apeFactory.svg', height: '30px' },
    {icon: '/logos/freieDigitale.svg', height: '20px' },
    {icon: '/logos/berlitz.svg', height: '30px' },
    {icon: '/logos/sisley.svg', height: '30px' },
];

export default function LogoSlider() {
    return (
        <div className={styles.marqueeWrapper}>
            <Marquee 
                speed={40}
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
                                style={{ height: element.height}}
                            />
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
}