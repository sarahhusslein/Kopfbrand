import React from 'react';
import { motion } from 'framer-motion';
import styles from './footer.module.css';
import SVG from 'react-inlinesvg';


const footerServiceItems = [
    { icon: '/icons/strategie.svg', text: 'Strategie & Beratung' },
    { icon: '/icons/konzeption.svg', text: 'Konzeption & Kreation' },
    { icon: '/icons/contentDesign.svg', text: 'Digital Content Design' },
    { icon: '/icons/prototyping.svg', text: 'Prototyping & Produktion' },
    { icon: '/icons/versand_new.svg', text: 'Versand & Lagerung' },
];

const footerContactItems = [
    { icon: '/icons/linkedIn.svg', text: 'LinkedIn' },
    { icon: '/icons/phone.svg', text: '089 24224281' },
    { icon: '/icons/mail.svg', text: 'info@kopfbrand.com' },
];

const DURATION = 0.3;
const STAGGER = 0;

const AnimatedFooterItem = ({ icon, text }) => (
    <motion.div 
        className={styles.item}
        whileHover="hovered"
        initial="initial"
        animate="initial"
    >
        <SVG src={icon} className={styles.icon} />
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
    </motion.div>
);

 
  export default function Footer() {

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
                <div className={styles.logoContainer}>
                <SVG src="/logos/kopfbrand.svg" className={styles.logo}/>
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
                            />
                        ))}
                    </div>
                <p className={styles.highlightedText}>Impressum</p>
                <p className={styles.highlightedText}>Datenschutzbedingungen</p>
                </div>
            </div>
        </motion.div>
      </div>
    );
  }