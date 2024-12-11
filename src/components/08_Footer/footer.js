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
            <div className={styles.column}>
                <h4 className={styles.h4}>Wir unterstützen dich bei</h4>
                <div className={styles.text}>
                    {footerServiceItems.map(({ icon, text }, index) => (
                        <div className={styles.item} key={index}>
                            <SVG src={icon} className={styles.icon} />
                            {text}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.column}>
                <h4 className={styles.h4}>Kontakt 👋🏼</h4>
                <div className={styles.content}>
                    <div className={styles.text}>
                        {footerContactItems.map(({ icon, text }, index) => (
                            <div className={styles.item} key={index}>
                                <SVG src={icon} className={styles.icon} />
                                {text}
                            </div>
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