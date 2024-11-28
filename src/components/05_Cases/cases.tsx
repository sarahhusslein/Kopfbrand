"use client"
import React, { useRef, useState, useEffect } from 'react'; 
import styles from './cases.module.css';
import SVG from 'react-inlinesvg';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const services = [
    {
        id: 1,
        image: "/images/caseStudyExample.png",
        company: "RUBY HOTELS",
        description: "Visuelle Gestaltung der kompletten Hotelausstattung von der Bodylotion bis zur Keycard.",
        tags: ["Konzeption", "Werbemittel", "Verpackungsdesign"],
    },
    {
        id: 2,
        image: "/images/caseStudyExample.png",
        company: "Kunde Zwei",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
    {
        id: 3,
        image: "/images/caseStudyExample.png",
        company: "Dritter Kunde",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
    {
        id: 4,
        image: "/images/caseStudyExample.png",
        company: "Case Study Vier",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
    {
        id: 5,
        image: "/images/caseStudyExample.png",
        company: "Fünfte Case Study",
        description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
        tags: ["TagOne", "TagTwo", "TagThree"],
    },
  
  ];



  
    export default function Cases() {
      const [activeIndex, setActiveIndex] = useState(0);
      const wrapperRef = useRef<HTMLDivElement>(null);

      

    
      return (
        <div className={styles.casesWrapper}>
          {services.map((service, index) => (
            <CaseStudyCard 
              key={service.id} 
              service={service} 
              index={index}
              setActiveIndex={setActiveIndex} 
            />
          ))}
          
          {/* Pagination Dots */}
          <div className={styles.pagination}>
            {services.map((_, index) => (
              <div 
                key={index} 
                className={`${styles.dot} ${activeIndex === index ? styles.activeDot : ''}`}
              />
            ))}
          </div>
        </div>
      );
    }


    const CaseStudyCard = ({ service, index, setActiveIndex }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      
      const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
      });
    
      const scaleY = useTransform(scrollYProgress, 
        [0, 1], 
        [0, 1]  // Start from 0 (collapsed) to 1 (full height)
      );
  
      const opacity = useTransform(scrollYProgress,
          [0.3, 0.5, 0.7],
          [0, 1, 0]
        );

        useEffect(() => {
          const unsubscribe = scrollYProgress.onChange(value => {
            if (value >= 0.4 && value <= 0.6) {
              setActiveIndex(index);
            }
          });
          return () => unsubscribe();
        }, [scrollYProgress, index, setActiveIndex]);
    
        return (
          <motion.div 
            ref={ref}
            className={styles.container}
            style={{
              scaleY,
              transformOrigin: 'top',
            }}
          >
            <div className={styles.imageWrapper}>
              <img 
              className={styles.image}
              src={service.image} 
              alt={service.company} 
              />
          </div>
            <motion.div 
              className={styles.textWrapper}
              style={{ opacity }}
            >
              <div className={styles.overlay} />
              <div className={styles.textContainer}>
                <h2 className={`h2 ${styles.h2}`}>{service.company}</h2>
                <h4 className={`subtitle ${styles.subtitle}`}>{service.description}</h4>
                <div className={styles.tagRow}>
                  {service.tags.map((tag, index) => (
                    <p key={index} className={`tag ${styles.tag}`}>{tag}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      };