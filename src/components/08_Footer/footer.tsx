"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; 
import { TransitionLink } from '@/utils/TransitionLink';
import styles from './footer.module.css';
import SVG from 'react-inlinesvg';


interface FooterItem {
    icon: string;
    text: string;
    url?: string;
    label?: string;
  }

interface AnimatedFooterItemProps {
    icon: string;
    text: string;
    url?: string;
    label?: string;
}

const footerServiceItems: FooterItem[] = [
    { icon: '/icons/strategie.svg', text: 'Strategie & Beratung', label: 'Strategie & Beratung' },
    { icon: '/icons/konzeption.svg', text: 'Konzeption & Kreation', label: 'Konzeption & Kreation' },
    { icon: '/icons/contentDesign.svg', text: 'Digital Content Design', label: 'Digital Content Design' },
    { icon: '/icons/prototyping.svg', text: 'Prototyping & Produktion', label: 'Prototyping & Produktion' },
    { icon: '/icons/versand_new.svg', text: 'Versand & Lagerung', label: 'Versand & Lagerung' },
];

const footerContactItems: FooterItem[] = [
    { icon: '/icons/linkedIn.svg', text: 'LinkedIn', url: 'https://www.linkedin.com', label: 'LinkedIn' },
    { icon: '/icons/phone.svg', text: '089 24224281', url: 'tel:08924224281', label: 'Telefon' },
    { icon: '/icons/mail.svg', text: 'info@kopfbrand.com', url: 'mailto:info@kopfbrand.com', label: 'E-Mail' },
];

const DURATION = 0.3;
const STAGGER = 0;

//     <motion.div 
//         className={styles.item}
//         whileHover="hovered"
//         initial="initial"
//         animate="initial"
//     >
//         <SVG src={icon} className={styles.icon} />
//         <motion.div 
//             className={styles.animatedText}
//         >
//             <div className={styles.textWrapper}>
//             {url ? (
//                     <a href={url} className={styles.contactLink}>
//                         {text.split('').map((letter, i) => (
//                             <motion.span 
//                                 key={i}
//                                 variants={{
//                                     initial: { y: 0 },
//                                     hovered: { y: "-100%" },
//                                 }}
//                                 transition={{
//                                     duration: DURATION,
//                                     ease: "easeInOut",
//                                     delay: STAGGER * i,
//                                 }}
//                             >
//                                 {letter === ' ' ? '\u00A0' : letter}
//                             </motion.span>
//                         ))}
//                     </a>
//                 ) : (
//                     text.split('').map((letter, i) => (
//                         <motion.span 
//                             key={i}
//                             variants={{
//                                 initial: { y: 0 },
//                                 hovered: { y: "-100%" },
//                             }}
//                             transition={{
//                                 duration: DURATION,
//                                 ease: "easeInOut",
//                                 delay: STAGGER * i,
//                             }}
//                         >
//                             {letter === ' ' ? '\u00A0' : letter}
//                         </motion.span>
//                     ))
//                 )}
//             </div>
//             <div className={styles.hoverText}>
//                 {text.split('').map((letter, i) => (
//                     <motion.span 
//                         key={i}
//                         variants={{
//                             initial: { y: "100%" },
//                             hovered: { y: 0 },
//                         }}
//                         transition={{
//                             duration: DURATION,
//                             ease: "easeInOut",
//                             delay: STAGGER * i,
//                         }}
//                     >
//                         {letter === ' ' ? '\u00A0' : letter}
//                     </motion.span>
//                 ))}
//             </div>
//         </motion.div>
//     </motion.div>
// );

const AnimatedFooterItem: React.FC<AnimatedFooterItemProps> = ({ icon, text, url, label }) => (
    <motion.div 
        className={styles.item}
        whileHover="hovered"
        initial="initial"
        animate="initial"
    >
        <SVG aria-label={`${label} Icon`} src={icon} className={styles.icon} />
        {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <motion.div 
                    className={styles.animatedText}
                >
                    <div className={styles.textWrapper}>
                        {text.split('').map((letter, i) => (
                            <motion.span 
                                key={i}
                                variants={{
                                    initial: { y: 0 },
                                    hovered: { y: "-100%" },
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: "easeInOut",
                                    delay: STAGGER * i,
                                }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </div>
                    <div className={styles.hoverText}>
                        {text.split('').map((letter, i) => (
                            <motion.span 
                                key={i}
                                variants={{
                                    initial: { y: "100%" },
                                    hovered: { y: 0 },
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: "easeInOut",
                                    delay: STAGGER * i,
                                }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </a>
        ) : (
            <motion.div className={styles.animatedText}>
                <div className={styles.textWrapper}>
                    {text.split('').map((letter, i) => (
                        <motion.span 
                            key={i}
                            variants={{
                                initial: { y: 0 },
                                hovered: { y: "-100%" },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </div>
                <div className={styles.hoverText}>
                    {text.split('').map((letter, i) => (
                        <motion.span 
                            key={i}
                            variants={{
                                initial: { y: "100%" },
                                hovered: { y: 0 },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        )}
    </motion.div>
);

 
  export default function Footer(): JSX.Element {

    const router = useRouter();

    return (
      <div className={styles.bar}>
        <motion.div 
        className={styles.container}
        initial={{ y: 40, opacity: 0, }}
        whileInView={{ y: 0, opacity: 1,}}
        viewport={{ once: false, amount: 0.05}}
        transition={{ duration: 0.5, ease: "easeInOut"}}
        >
            {/* Column 1 */}
            <div className={styles.column}>
                <div className={styles.logoContainer} onClick={() => router.push('/')}>
                    <SVG aria-label="Logo Kopfbrand" src="/logos/kopfbrand.svg" className={styles.logo}/>
                </div>
                <div className={styles.content}>
                    <p className={styles.highlightedText}>Agentur Kopfbrand</p>
                    <p className={styles.text}>Rumfordstraße 21, 80469 München</p>
                    <p className={styles.text + " " + styles.invisible}>Invisible</p>
                    <p className={styles.highlightedText}>Kopfbrand Manufaktur</p>
                    <p className={styles.text}>Thierschstraße 20, 80538 München</p>
                </div>
            </div>

            {/* Column 2 */}
            <div className={styles.column}>
                <h4 className={styles.h4}>Wir unterstützen dich bei</h4>
                <div className={styles.text}>
                    {footerServiceItems.map(( item, index) => (
                        <AnimatedFooterItem 
                        key={index}
                        icon={item.icon}
                        text={item.text}
                        />
                    ))}
                </div>
            </div>

            {/* Column 3 */}
            <div className={styles.column}>
                <h4 className={styles.h4}>Kontakt 👋🏼</h4>
                <div className={styles.content}>
                    <div className={styles.text}>
                        {footerContactItems.map(( item, index) => (
                            <AnimatedFooterItem 
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            url={item.url}
                            />
                        ))}
                    </div>
                <TransitionLink href="/impressum" className={styles.link}>Impressum</TransitionLink>
                <TransitionLink href="/datenschutz" className={styles.link}>Datenschutzbedingungen</TransitionLink>
                </div>
            </div>
        </motion.div>
      </div>
    );
  }