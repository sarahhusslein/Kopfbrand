"use client"
import React, { useState } from 'react'; 
import styles from './team.module.css';
import SVG from 'react-inlinesvg';


const teamMembers = [
    {
        id: 1,
        name: "Christoph Bäumler",
        position: "Gründer & CEO",
        keywords: ["#fastfoodjunkie 🍔", "#berghüttenbesitzer 🏔️️️", "#grünerdaumen 🌱 "],
    },
    {
        id: 2,
        name: "Victoria Reuter",
        position: "Art Direction",
        keywords: ["#rundumversorgerin 🌟", "#coffeejunkie ☕️️", "#fellnasenliebhaberin 🦮"],
    },
    {
        id: 3,
        name: "Christina Hansen",
        position: "Freelance Art Direction",
        keywords: ["#mrssunshine ☀️", "#gipfelstürmerin 🏔️️️", "#everydayisthebestday 🌈 "],
    },
    {
        id: 4,
        name: "Corinna Moritz",
        position: "Freelance Art Direction",
        keywords: ["#immerbilderimkopf 🎨", "#anappleeachday 🍏", "#fürjedenspasszuhaben 🎉 "],
    },
    {
        id: 5,
        name: "Patricia Reiter",
        position: "Werkstudentin",
        keywords: ["#agenturküken 🐣", "#bäckerinmitleidenschaft 🧁", "#filmgeek 🎬 "],
    }
];

export default function Team() {

    const [SwitchOn, setSwitchOn] = useState(false);
    const [hoveredMember, setHoveredMember] = useState(null);
    const [mousePosition, setMousePosition] = useState({ 
        x: 0, 
        y: 0, 
    });


    const handleSwitchToggle = () => {
        setSwitchOn(prevState => !prevState); 
    };

    const handleMouseMove = (e, memberId) => {
        const containerRect = e.currentTarget.closest(`.${styles.teamImageContainer}`).getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;
        
        // Calculate if the bubble would go off-screen
        const bubbleWidth = 290; // width from CSS
        const screenWidth = window.innerWidth;
        const bubbleRightEdge = e.clientX + bubbleWidth;
        
        // Determine which transform to use
        const shouldOffsetLeft = bubbleRightEdge > screenWidth;
    
        setMousePosition({
            x: x,
            y: y,
            shouldOffsetLeft: shouldOffsetLeft // Add this to the state
        });
        setHoveredMember(memberId);
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
            <div className={styles.teamImageContainer}>
                {hoveredMember && (
                    <div 
                        className={styles.personFunFact}
                        style={{
                            left: `${mousePosition.x}px`,
                            top: `${mousePosition.y}px`,
                            transform: mousePosition.shouldOffsetLeft ? 
                                'translate(-100%, -100%)' : 
                                'translate(-0%, -100%)',
                            borderRadius: mousePosition.shouldOffsetLeft ?
                                '30px 30px 0px 30px' :
                                '30px 30px 30px 0px'
                        }}
                    >
                        <h3 className={`h3 ${styles.name}`}>{teamMembers[hoveredMember - 1].name}</h3>
                        <p className={`body-light ${styles.position}`}>{teamMembers[hoveredMember - 1].position}</p>
                        <p className={`body ${styles.keywords}`}>
                            {teamMembers[hoveredMember - 1].keywords.join('\n')}
                        </p>
                    </div>
                )}
                
                <div className={styles.hoverAreas}>
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className={styles.hoverArea}
                            data-member-id={member.id}
                            onMouseMove={(e) => handleMouseMove(e, member.id)}
                            onMouseLeave={() => setHoveredMember(null)}
                        />
                    ))}
                </div>
                
                <img src="images/team.png" alt="teamPicture" className={styles.teamPicture} />
            </div>
        </div>
    );
}