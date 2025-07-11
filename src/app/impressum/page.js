"use client"
import React from 'react';
import styles from './impressum.module.css';
import { useRouter } from 'next/navigation'; 
import { motion } from 'framer-motion';
import Image from 'next/image';
import SVG from 'react-inlinesvg';
import Footer from '@/components/08_Footer/footer';
import FinalBar from '@/components/09_FinalBar/finalBar';


export default function Impressum() {

const router = useRouter();

  return (
    <div>
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image aria-label="Impressum" src="/images/impressum.jpg" className={styles.image} width={1920} height={384} alt="Impressum"/>
                <div className={styles.clickableArea} onClick={() => router.push('/')}>
                    <SVG aria-label="Logo Kopfbrand" src="/logos/flameWithCircle.svg" className={styles.logo}/>
                </div>
                <motion.div 
                    className={styles.headlineContainer}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0 }}
                >
                    <h1 className={`h1 ${styles.h1}`}> Impressum </h1>
                </motion.div>
            </div>

            <div className={styles.textContainer}>
            <motion.div 
                className={styles.innerContainer}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0, }}
                >
                    <div className={styles.emptyDiv}></div>
                    {/* <h1 className={`h1 ${styles.h1}`}> Impressum </h1> */}

                    <h3 className={`h3 ${styles.h3}`}> Angaben gemäß § 5 TMG </h3>
                    <p className={`body ${styles.body}`}>
                        Kopfbrand GmbH<br />
                        GF: Christoph Bäumler<br />
                        Rumfordstraße 21<br />
                        80469 München<br />
                        Deutschland
                    </p>

                    <h3 className={`h3 ${styles.h3}`}> Registereintrag </h3>
                    <p className={`body ${styles.body}`}>
                        Sitz der Gesellschaft: München<br />
                        Handelsregister: Amtsgericht München, HRB 301680<br />
                        USt-IdNr.: DE455128445 (gem. §27a Umsatzsteuergesetz)
                    </p>

                    <h3 className={`h3 ${styles.h3}`}> Kontakt </h3>
                    <p className={`body ${styles.body}`}>
                        Telefon: <a target="_blank" rel="noopener noreferrer" className={styles.link} href="tel:+498924224281">089 24224281</a><br />
                        Telefax: 089 24224288<br />
                        E-Mail: <a target="_blank" rel="noopener noreferrer"className={styles.link} href="mailto:info@kopfbrand.com">info@kopfbrand.com</a>
                    </p>

                    <h3 className={`h3 ${styles.h3}`}> Verantwortlich für den Inhalt (<span className={styles.highlightedText}>gem. § 55 Abs. 2 RStV</span>) </h3> 
                    <p className={`body ${styles.body}`}>
                        Christoph Bäumler<br />
                        Kopfbrand GmbH<br />
                        Rumfordstraße 21<br />
                        80469 München
                    </p>

                    <h3 className={`h3 ${styles.h3}`}> Bildrechte </h3>
                    <p className={`body ${styles.body}`}>
                        Christoph Bäumler<br />
                        Kopfbrand GmbH<br />
                        Rumfordstraße 21<br />
                        80469 München
                        <br />
                        <br />
                        <strong>Auf der Website verwendete Bilder</strong> <br />
                        Ruby GmbH Fotostock <br />
                        istockphoto-626172712 <br />
                        mockups-design.com <br />
                    </p>


                    <h3 className={`h3 ${styles.h3}`}> Hinweis zur Streitbeilegung: </h3>
                    <p className={`body ${styles.body}`}>
                        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <br />
                        <a target="_blank" rel="noopener noreferrer" className={styles.link} href="https://ec.europa.eu/consumers/odr">
                        https://ec.europa.eu/consumers/odr
                        </a>
                        . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                    </p>

                    <div className={styles.emptyDivTwo}></div>

                    <h2 className={`h2 ${styles.h2}`}> Disclaimer </h2>
                    <h3 className={`h3 ${styles.h3}`}> Haftung für Inhalte </h3>
                    <p className={`body ${styles.body}`}>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.      
                    </p>

                    <h3 className={`h3 ${styles.h3}`}> Haftung für Links </h3>
                    <p className={`body ${styles.body}`}>
                    Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.      
                    </p>

                    <h3 className={`h3 ${styles.h3}`}> Urheberrecht </h3>
                    <p className={`body ${styles.body}`}>
                    Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als solche gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder kompletter Seiten ist nicht gestattet und strafbar. Lediglich die Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt. Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.
                    </p>

                    <h3 className={`h3 ${styles.h3}`}> Besondere Nutzungsbedingungen </h3>
                    <p className={`body ${styles.body}`}>
                    Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich darauf hingewiesen. In diesem Falle gelten im jeweiligen Einzelfall die besonderen Nutzungsbedingungen.      </p>
                </motion.div>
                <div className={styles.emptyDiv}></div>
                <div className={styles.emptyDiv}></div>
            </div>
            <Footer />
            <FinalBar />
        </div>
    </div>
  );
}
