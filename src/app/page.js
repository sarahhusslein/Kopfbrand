import Image from "next/image";
import styles from "./page.module.css";
import FinalBar from "@/components/10_FinalBar/finalBar";
import Footer from "@/components/09_Footer/footer";
import LogoSlider from "@/components/01_Header/logoSlider";
import Header from "@/components/01_Header/header";
import Services from "@/components/02_Services/services";
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
        <Header />
        <Services />
        <Numbers />
        <Testimonials />
        <CasesHeadline />
        <Cases />
        <Team />
        <Creativity />
        <Contact />
        <Footer />
        <FinalBar />
      </main>
    </div>
  );
}
