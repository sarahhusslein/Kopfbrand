import React from 'react';
import styles from './footer.module.css';
import SVG from 'react-inlinesvg';

const footerServiceItems = [
    { icon: '/icons/strategie.svg', text: 'Strategie & Beratung' },
    { icon: '/icons/konzeption.svg', text: 'Konzeption & Kreation' },
    { icon: '/icons/contentDesign.svg', text: 'Digital Content Design' },
    { icon: '/icons/prototyping.svg', text: 'Prototyping & Produktion' },
    { icon: '/icons/versand.svg', text: 'Versand & Lagerung' },
];

const footerContactItems = [
    { icon: '/icons/linkedIn.svg', text: 'LinkedIn' },
    { icon: '/icons/phone.svg', text: '089 24224281' },
    { icon: '/icons/mail.svg', text: 'info@kopfbrand.com' },
];
 
  export default function Footer() {
    return (
      <div className={styles.bar}>

        <div className={styles.container}>
            <div className={styles.column}>
            <SVG src="/logos/kopfbrand.svg" className={styles.logo}/>
                <p className={styles.highlightedText}>Agentur Kopfbrand</p>
                <p className={styles.text}>Rumfordstraße 21, 80469 München</p>
                <p className={styles.highlightedText}>Kopfbrand Manufaktur</p>
                <p className={styles.text}>Thierschstraße 20, 80538 München</p>
            </div>
            <div className={styles.column}>
                <h4>Wir unterstützen dich bei</h4>
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
                <h4>Kontakt 👋🏼</h4>
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
      </div>
    );
  }