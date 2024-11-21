import styles from "./page.module.css";
import NavigationBar from "@/components/00_NavigationBar/navigationBar";
import Header from "@/components/01_Header/header";
import Services from "@/components/02_Services/services";
import Numbers from "@/components/03_Numbers/numbers";
import Testimonials from "@/components/04_Testimonials/testimonials";
import CasesHeadline from "@/components/05_Cases/casesHeadline";
import Cases from "@/components/05_Cases/cases";
import Team from "@/components/06_Team/team";
import Creativity from "@/components/07_Creativity/creativity";
import Contact from "@/components/08_Contact/contact";
import Footer from "@/components/09_Footer/footer";
import FinalBar from "@/components/10_FinalBar/finalBar";


export default function Home() {
  return (
    <div className={styles.page}>
      <NavigationBar />
      <main className={styles.main}>
        <Header />
        <section id="services">
          <Services />
        </section>
        <Numbers />
        <Testimonials />
        <section id="cases">
          <CasesHeadline />
          <Cases />
        </section>
        <section id="team">
          <Team />
        </section>
        <Creativity />
        <section id="contact">
          <Contact />
        </section>
        <section id="footer">
          <Footer />
        </section>
        <FinalBar />
      </main>
    </div>
  );
}
