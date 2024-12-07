"use client";
import React, { useState, useEffect } from 'react';
import styles from './services.module.css';
import placeholderServiceAnimation from '/public/animations/placeholderServiceAnimation.json';  
import serviceAnimation from '/public/animations/service.json';  
import konzeptionAnimaton from '/public/animations/konzeption.json';
import contentcreationAnimation from '/public/animations/contentcreation.json';
import prototypingAnimation from '/public/animations/prototyping.json';
import versandAnimation from '/public/animations/versand.json';
import testAnimation from '/public/animations/test.json';
import SVG from 'react-inlinesvg';
import Lottie from 'lottie-react'; 


const services = [
  {
      id: 1,
      animation: serviceAnimation,
      number: "01",
      title: "Strategie & Beratung",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 20,
  },
  {
      id: 2,
      animation: konzeptionAnimaton,
      number: "02",
      title: "Konzeption & Kreation",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 80,
  },
  {
      id: 3,
      animation: contentcreationAnimation,
      number: "03",
      title: "Digital Content Design",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 25,
  },
  {
      id: 4,
      animation: prototypingAnimation,
      number: "04",
      title: "Prototyping & Produktion",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 40,
  },
  {
      id: 5,
      animation: versandAnimation,
      number: "05",
      title: "Versand & Lagerung",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
      paddingTop: 45,
  },

];


export default function Services() {

  const [activeIndex, setActiveIndex] = useState(2); // Start with third service active


  return (
    <div className={styles.container}>
        <h1 className={`h1 ${styles.h1}`}>KREATIVAGENTUR</h1>
        <h4 className={`subtitle ${styles.h4}`}>
            Wir konzipieren, gestalten, und kreieren. Von der Idee bis zum Prototyping. 
            <br />
            Lorem ipsum text.
        </h4>

        <div className={styles.servicesWrapper}>
            {services.map((service, index) => (
                <React.Fragment key={service.id}>
                    <SVG src="/illustrations/divider.svg" className={styles.divider} />
                    <div 
                        className={`${styles.serviceSection} ${index === activeIndex ? styles.hover : ''}`}
                        style={{ paddingTop: `${service.paddingTop}px` }}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(2)} // Return to default state (third service)
                    >
                        <div className={styles.animationContainer}>
                            <Lottie 
                                animationData={service.animation}
                                className={styles.drawingAnimation}
                                loop={true}
                                autoplay={true}
                            />
                        </div>
                        <div className={styles.textContent}>
                            <span className={`numbers ${styles.number}`}>{service.number}</span>
                            <h3 className={`subtitle-highlighted ${styles.serviceTitle}`}>{service.title}</h3>
                            <p className={`body ${styles.description}`}>{service.description}</p>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>

    </div>
  );
}


