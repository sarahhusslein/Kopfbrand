import Image from "next/image";
import styles from "./page.module.css";
import FinalBar from "@/components/10_FinalBar/finalBar";
import Footer from "@/components/09_Footer/footer";
import LogoSlider from "@/components/01_Header/logoSlider";
import Numbers from "@/components/03_Numbers/numbers";
import Testimonials from "@/components/04_Testimonials/testimonials";
import CasesHeadline from "@/components/05_Cases/casesHeadline";
import Cases from "@/components/05_Cases/cases";
import Creativity from "@/components/07_Creativity/creativity";
import Team from "@/components/06_Team/team";
import Contact from "@/components/08_Contact/contact";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.placeholder}>
          <div className="h1">Header</div>
          {/* <LogoSlider /> */}
          <div className="h2">Services</div>
          <div className="h3">Zahlen</div>
          <Numbers />
          <Testimonials />
          <CasesHeadline />
          <Cases />
          <Team />
          <Creativity />
        </div>
        <Contact />
        <Footer />
        <FinalBar />
      </main>
    </div>
  );
}
