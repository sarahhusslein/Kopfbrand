"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './casesNew.module.css';


const services = [
    {
        id: 1,
        image: "/images/caseStudyHotelGrey.jpg",
        company: "RUBY HOTELS",
        description: "Visuelle Gestaltung der kompletten Hotelausstattung von der Bodylotion bis zur Keycard.",
        tags: ["Konzeption", "Werbemittel", "Verpackungsdesign"],
    },
    {
        id: 2,
        image: "/images/caseStudyCat.jpg",
        company: "Kunde Zwei",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
    {
        id: 3,
        image: "/images/caseStudyBanners.png",
        company: "Dritter Kunde",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
    {
        id: 4,
        image: "/images/caseStudyMagazineOpen.jpg",
        company: "Case Study Vier",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
    {
        id: 5,
        image: "/images/caseStudyMagazineKid.jpg",
        company: "Fünfte Case Study",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
  
  ];


  export default function Cases() {
    const [activeIndex, setActiveIndex] = useState(0);
    const ref = React.useRef<HTMLDivElement>(null);
    


    return (
      <div className={styles.moduleContainer}>
          {/* Pagination */}
          <div className={styles.paginationWrapper}>
              <div className={styles.pagination}>
                  {services.map((_, index) => (
                      <div
                          key={index}
                          className={`${styles.dot} ${activeIndex === index ? styles.activeDot : ''}`}
                      />
                  ))}
              </div>
          </div>

          {/* Cases Image Scrolling */}
          <div className={styles.casesContainer}>
              {services.map((service, index) => (
                  <CaseStudyImage key={service.id} service={service} />
              ))}
          </div>
      </div>
  );
}



  const CaseStudyImage = ({ service }) => {
    const ref = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "start start"]
    });
  
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
    return (
      <motion.div 
        ref={ref}
        style={{
          scaleY,
          transformOrigin: 'top',
        }}
      >
        <img 
          className={styles.image}
          src={service.image} 
          alt={service.company} 
        />
      </motion.div>
    );
  };
