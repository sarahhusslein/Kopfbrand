"use client"
import React, { useState } from 'react'; 
import styles from './team.module.css';
import SVG from 'react-inlinesvg';


export default function Team() {

    const [SwitchOn, setSwitchOn] = useState(false);

    const handleSwitchToggle = () => {
        setSwitchOn(prevState => !prevState); 
    };


    return (
        <div className={styles.container}>
            <h1 className={`h1 ${styles.h1}`}>
                WIR STELLEN UNS VOR
            </h1>
            <h4 className={`subtitle ${styles.h4}`}>
                Jetzt mal ehrlich, hast du dich uns so vorgestellt? 
                <br />
                85 Jahre Berufserfahrung, 7000 Stunden Calls und ein Lächeln auf Knopfdruck - das ist unser Team.
            </h4>
            <div className={styles.switchContainer}>
                <p className={`handschrift-small ${styles.handschrift}`}>Nicht drücken!</p>
                <SVG src={'illustrations/arrowStraightRight.svg'} className={styles.arrow}/>
                <SVG 
                    src={SwitchOn ? 'illustrations/switchOn.svg' : 'illustrations/switchOff.svg'} 
                    className={styles.switch} 
                    onClick={handleSwitchToggle}
                />
            </div>
        </div>
    );
}