"use client"
import styles from './privacy.module.css';
import Image from 'next/image';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/navigation'; 
import Footer from '@/components/08_Footer/footer';
import FinalBar from '@/components/09_FinalBar/finalBar';

export default function Privacy() {

  const router = useRouter();


  return (
    <div className={styles.container}>
        <div className={styles.imageContainer}>
            <Image src="/images/impressum.jpg" className={styles.image} width={1920} height={384} alt="Datenschutz"/>
            <div className={styles.clickableArea} onClick={() => router.push('/')}>
                <SVG src="/logos/flameWithCircle.svg" className={styles.logo}/>
            </div>
            <div className={styles.headlineContainer}>
                <h1 className={`h1 ${styles.h1}`}> Datenschutzerklärung </h1>
            </div>
        </div>

    <div className={styles.textContainer}>
        <div className={styles.innerContainer}>
            <div className={styles.emptyDiv}></div>
            {/* Datenschutz */}
              <h3 className={`h3 ${styles.h3}`}> Datenschutz </h3>
              <p className={`body ${styles.body}`}>
                  Nachfolgend möchten wir Sie über unsere Datenschutzerklärung informieren. Sie finden hier Informationen über die Erhebung und Verwendung persönlicher Daten bei der Nutzung unserer Webseite. Wir beachten dabei das für Deutschland geltende Datenschutzrecht. Sie können diese Erklärung jederzeit auf unserer Webseite abrufen.
                  <br />
                  Wir weisen ausdrücklich darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen und nicht lückenlos vor dem Zugriff durch Dritte geschützt werden kann.
                  <br />
                  Die Verwendung der Kontaktdaten unseres Impressums zur gewerblichen Werbung ist ausdrücklich nicht erwünscht, es sei denn wir hatten zuvor unsere schriftliche Einwilligung erteilt oder es besteht bereits eine Geschäftsbeziehung. Der Anbieter und alle auf dieser Website genannten Personen widersprechen hiermit jeder kommerziellen Verwendung und Weitergabe ihrer Daten.
              </p>

              {/* Personenbezogene Daten */}
              <h3 className={`h3 ${styles.h3}`}> Personenbezogene Daten </h3>
              <p className={`body ${styles.body}`}>
              Sie können unsere Webseite ohne Angabe personenbezogener Daten besuchen. Soweit auf unseren Seiten personenbezogene Daten (wie Name, Anschrift oder E-Mail Adresse) erhoben werden, erfolgt dies, soweit möglich, auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Sofern zwischen Ihnen und uns ein Vertragsverhältnis begründet, inhaltlich ausgestaltet oder geändert werden soll oder Sie an uns eine Anfrage stellen, erheben und verwenden wir personenbezogene Daten von Ihnen, soweit dies zu diesen Zwecken erforderlich ist (Bestandsdaten). Wir erheben, verarbeiten und nutzen personenbezogene Daten soweit dies erforderlich ist, um Ihnen die Inanspruchnahme des Webangebots zu ermöglichen (Nutzungsdaten). Sämtliche personenbezogenen Daten werden nur solange gespeichert wie dies für den genannten Zweck (Bearbeitung Ihrer Anfrage oder Abwicklung eines Vertrags) erforderlich ist. Hierbei werden steuer- und handelsrechtliche Aufbewahrungsfristen berücksichtigt. Auf Anordnung der zuständigen Stellen dürfen wir im Einzelfall Auskunft über diese Daten (Bestandsdaten) erteilen, soweit dies für Zwecke der Strafverfolgung, zur Gefahrenabwehr, zur Erfüllung der gesetzlichen Aufgaben der Verfassungsschutzbehörden oder des Militärischen Abschirmdienstes oder zur Durchsetzung der Rechte am geistigen Eigentum erforderlich ist.
              </p>

              {/* Kommentarfunktionen */}
              <h3 className={`h3 ${styles.h3}`}> Kommentarfunktionen </h3>
              <p className={`body ${styles.body}`}>
              Im Rahmen der Kommentarfunktion erheben wir personenbezogene Daten (z.B. Name, E-Mail) im Rahmen Ihrer Kommentierung zu einem Beitrag nur in dem Umfang wie Sie ihn uns mitgeteilt haben. Bei der Veröffentlichung eines Kommentars wird die von Ihnen angegebene Email-Adresse gespeichert, aber nicht veröffentlicht. Ihr Name wird veröffentlicht, wenn Sie nicht unter Pseudonym geschrieben haben.
              </p>

              {/* Facebook-Plugin */}
              <h3 className={`h3 ${styles.h3}`}> Datenschutzerklärung für das Facebook-Plugin („Gefällt mir“) </h3>
              <p className={`body ${styles.body}`}>
              Diese Webseite nutzt Plugins des Anbieters Facebook.com, welche durch das Unternehmen Facebook Inc., 1601 S. California Avenue, Palo Alto, CA 94304 in den USA bereitgestellt werden. Nutzer unserer Webseite, auf der das Facebook-Plugin („Gefällt mir“-Button) installiert ist, werden hiermit darauf hingewiesen, dass durch das Plugin eine Verbindung zu Facebook aufgebaut wird, wodurch eine Übermittlung an Ihren Browser durchgeführt wird, damit das Plugin auf der Webseite erscheint.
              <br />
              Des Weiteren werden durch die Nutzung Daten an die Facebook-Server weitergeleitet, welche Informationen über Ihre Webseitenbesuche auf unserer Homepage enthalten. Dies hat für eingeloggte Facebook-Nutzer zur Folge, dass die Nutzungsdaten Ihrem persönlichen Facebook-Account zugeordnet werden. Sobald Sie als eingeloggter Facebook-Nutzer aktiv das Facebook-Plugin nutzen (z.B. durch das Klicken auf den „Gefällt mir“ Knopf oder die Nutzung der Kommentarfunktion), werden diese Daten zu Ihrem Facebook-Account übertragen und veröffentlicht. Dies können Sie nur durch vorheriges Ausloggen aus Ihrem Facebook-Account umgehen. Weitere Information bezüglich der Datennutzung durch Facebook entnehmen Sie bitte den datenschutzrechtlichen Bestimmungen auf Facebook unter <a target="_blank" rel="noopener noreferrer"className={styles.link} href="http://de-de.facebook.com/policy.php">http://de-de.facebook.com/policy.php</a>.
              </p>

              {/* Webanalysedienst Google Analytics */}
              <h3 className={`h3 ${styles.h3}`}> Datenschutzerklärung für den Webanalysedienst Google Analytics</h3> 
              <p className={`body ${styles.body}`}>
              Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. ("Google"). Google Analytics verwendet sog. "Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Wir haben die IP-Anonymisierung aktiviert. Auf dieser Webseite wird Ihre IP-Adresse von Google daher innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <a className={styles.link} href="http://twitter.com/privacy">http://twitter.com/privacy</a> 
              <br />
              Twitter bietet Ihnen unter nachfolgendem Link die Möglichkeit, Ihre Datenschutzeinstellungen selbst festzulegen: <a target="_blank" rel="noopener noreferrer" className={styles.link} href="http://tools.google.com/dlpage/gaoptout?hl=de"> http://tools.google.com/dlpage/gaoptout?hl=de </a>
              </p>


              {/* Webmessagedienst twitter.com */}
              <h3 className={`h3 ${styles.h3}`}> Datenschutzerklärung für die Nutzung von dem Webmessagedienst twitter.com</h3> 
              <p className={`body ${styles.body}`}>
              Wir haben auf unserer Webseite auch den Webmessagedienst twitter.com integriert. Dieser wird durch die Twitter Inc., 1355 Market St, Suite 900, San Francisco, CA 94103, USA bereitgestellt. Twitter bietet die sog. „Tweet“ – Funktion an. Damit kann man 140 Zeichen lange Nachrichten auch mit Webseitenlinks in seinem eigenen Twitteraccount veröffentlichen. Wenn Sie die „Tweet“-Funktion von Twitter auf unseren Webseiten nutzen, wird die jeweilige Webseite mit Ihrem Account auf Twitter verknüpft und dort ggf. öffentlich bekannt gegeben. Hierbei werden auch Daten an Twitter übertragen. Von dem Inhalt der übermittelten Daten und deren Nutzung durch Twitter erhalten wir keine Kenntnis. Konsultieren Sie daher für weitere Informationen die Datenschutzerklärung von Twitter: <a target="_blank" rel="noopener noreferrer"className={styles.link} href="http://twitter.com/privacy">http://twitter.com/privacy</a> 
              <br />
              Twitter bietet Ihnen unter nachfolgendem Link die Möglichkeit, Ihre Datenschutzeinstellungen selbst festzulegen: <a target="_blank" rel="noopener noreferrer" className={styles.link} href="http://twitter.com/account/settings">http://twitter.com/account/settings</a>.
              </p>

              {/* XING-Empfehlungsfunktion */}
              <h3 className={`h3 ${styles.h3}`}> Datenschutzerklärung für die XING-Empfehlungsfunktion</h3>
              <p className={`body ${styles.body}`}>
              Diese Webseite verwendet Funktionen der XING AG, Dammtorstraße 29-32, 20354 Hamburg, Deutschland. Bei jedem Aufruf unserer Webseite, die mit einer solchen Funktion ausgestattet ist, veranlasst diese, dass der von Ihnen verwendete Browser eine Verbindung zu Servern von XING herstellt. Personenbezogene Daten über den Aufruf unserer Webseite werden nach unserer Kenntnis dabei nicht gespeichert. XING speichert auch keine IP-Adressen und eine Auswertung des Nutzungsverhaltens über die Verwendung von Cookies im Zusammenhang mit dem “XING Share-Button” findet ebenfalls nicht statt. Weitere Informationen zum Datenschutz beim „XING Share-Button“ finden Sie unter: <a target="_blank" rel="noopener noreferrer" className={styles.link} href="https://www.xing.com/app/share?op=data_protection">https://www.xing.com/app/share?op=data_protection</a>        </p>

              {/* Auskunftsrecht */}
              <h3 className={`h3 ${styles.h3}`}> Auskunftsrecht </h3>
              <p className={`body ${styles.body}`}>
              Sie haben das jederzeitige Recht, sich unentgeltlich und unverzüglich über die zu Ihrer Person erhobenen Daten zu erkundigen. Sie haben das jederzeitige Recht, Ihre Zustimmung zur Verwendung Ihrer angegeben persönlichen Daten mit Wirkung für die Zukunft zu widerrufen. Zur Auskunftserteilung wenden Sie sich bitte an den Anbieter unter den Kontaktdaten im Impressum.
              </p>

              <div className={styles.emptyDiv}></div>

              <span> Quelle: <a target="_blank" rel="noopener noreferrer" className={styles.link} href="https://www.juraforum.de/datenschutz/datenschutz-fuer-webseiten-und-webanwendungen">www.juraforum.de</a> </span>
              <div className={styles.emptyDiv}></div>
              <div className={styles.emptyDiv}></div>

        </div>
    </div>
        <Footer />
        <FinalBar />
    </div>

  );
}
