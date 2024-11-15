"use client";
import React from 'react';
import styles from './services.module.css';
import SVG from 'react-inlinesvg';


const services = [
  {
      id: 1,
      number: "01",
      service: "Strategie & Beratung",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
  },
  {
      id: 2,
      number: "02",
      service: "Konzeption & Kreation",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
  },
  {
      id: 3,
      number: "03",
      service: "Digital Content Design",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
  },
  {
      id: 4,
        number: "04",
      service: "Prototyping & Produktion",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
  },
  {
      id: 5,
      number: "05",
      service: "Versand & Lagerung",
      description: "Lorem ipsum dolor sit amet. Ea eaque magni et possimus possimus eum nihil repellendus nla possimus eum nihil repellendus nla.",
  },

];


export default function Services() {


  return (
    <div className={styles.container}>
        <h1 className={`h1 ${styles.h1}`}>KREATIVAGENTUR</h1>
        <h4 className={`subtitle ${styles.h4}`}>
            Wir konzipieren, gestalten, und kreieren. Von der Idee bis zum Prototyping. 
            <br />
            Lorem ipsum text.
        </h4>
    </div>
  );
}


