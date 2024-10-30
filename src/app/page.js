import Image from "next/image";
import styles from "./page.module.css";
import FinalBar from "@/components/10_FinalBar/finalBar";
import Footer from "@/components/09_Footer/footer";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.placeholder}>
          <div className="h1">Header</div>
          <div className="h2">Services</div>
          <div className="h3">Zahlen</div>
          <div>Testimonials</div>
          <div>Cases</div>
          <div>Team</div>
          <div>Kreativität</div>
          <div>Kontakt</div>
        </div>
        <Footer />
        <FinalBar />
      </main>
    </div>
  );
}
