"use client"
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer'; 
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
    const [displayName, setDisplayName] = useState('');
    const [displayPosition, setDisplayPosition] = useState('');
    const [displayKeywords, setDisplayKeywords] = useState('');
    const [mousePosition, setMousePosition] = useState({ 
        x: 0, 
        y: 0, 
    });

    // Add useInView hook
    const { ref: teamImageRef, inView } = useInView({
        threshold: 0.8, // Trigger when 50% of the component is visible
    });

    // Trigger default member display when component comes into view
    useEffect(() => {
        if (inView) {
            const defaultMember = teamMembers[2]; // Index 2 is the third person
            setHoveredMember(defaultMember.id);
            setMousePosition({
                x: window.innerWidth / 2,
                y: 200,
                shouldOffsetLeft: false
            });
            animateText(defaultMember);
        }
    }, [inView]); 


    const handleSwitchToggle = () => {
        setSwitchOn(prevState => !prevState); 
    };

    const animateText = (member) => {
        // Reset all text when starting new animation
        setDisplayName('');
        setDisplayPosition('');
        setDisplayKeywords('');
        
        // Animate name first
        let nameIndex = 0;
        const nameTimer = setInterval(() => {
            if (nameIndex <= member.name.length) {
                setDisplayName(member.name.slice(0, nameIndex));
                nameIndex++;
            } else {
                clearInterval(nameTimer);
                // Start position animation only after name is complete
                let posIndex = 0;
                const posTimer = setInterval(() => {
                    if (posIndex <= member.position.length) {
                        setDisplayPosition(member.position.slice(0, posIndex));
                        posIndex++;
                    } else {
                        clearInterval(posTimer);
                        // Start keywords animation only after position is complete
                        let keywordsText = member.keywords.join('\n');
                        let keyIndex = 0;
                        const keyTimer = setInterval(() => {
                            if (keyIndex <= keywordsText.length) {
                                setDisplayKeywords(keywordsText.slice(0, keyIndex));
                                keyIndex++;
                            } else {
                                clearInterval(keyTimer);
                            }
                        }, 10);
                    }
                }, 10);
            }
        }, 10);
    };

    const handleMouseMove = (e, memberId) => {
        const containerRect = e.currentTarget.closest(`.${styles.teamImageContainer}`).getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        // Calculate relative position (0 to 1) across the width
        const relativeX = x / containerRect.width;
        
        // Calculate tilt angle (-15 to 15 degrees)
        // Center (0.5) = 0 degrees, Left edge = -15 degrees, Right edge = 15 degrees
        const tiltAngle = (relativeX - 0.5) * 30;
        
        // Calculate if the bubble would go off-screen
        const bubbleWidth = 290; // width from CSS
        const screenWidth = window.innerWidth;
        const bubbleRightEdge = e.clientX + bubbleWidth;
        
        // Determine which transform to use
        const shouldOffsetLeft = bubbleRightEdge > screenWidth;

        if (memberId !== hoveredMember) {
            // Only trigger animation when hovering a new member
            const member = teamMembers[memberId - 1];  // Get the correct team member data
            animateText(member);  // Start animation with this member's data
        }
    
        setMousePosition({
            x: x,
            y: y,
            shouldOffsetLeft: shouldOffsetLeft,
            tiltAngle: tiltAngle
        });
         // Only update hoveredMember if it's different
        if (memberId !== hoveredMember) {
            setHoveredMember(memberId);
        }
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
            <div className={styles.teamImageContainer} ref={teamImageRef}>
                {hoveredMember && (
                    <div 
                        className={styles.personFunFact}
                        style={{
                            left: `${mousePosition.x}px`,
                            top: `${mousePosition.y}px`,
                            transform: `${mousePosition.shouldOffsetLeft ? 
                                'translate(-100%, -100%)' : 
                                'translate(-0%, -100%)'} rotate(${mousePosition.tiltAngle}deg)`,
                            borderRadius: mousePosition.shouldOffsetLeft ?
                                '30px 30px 0px 30px' :
                                '30px 30px 30px 0px'
                        }}
                    >
                        <h3 className={`h3 ${styles.name}`}>{displayName}</h3>
                        <p className={`body-light ${styles.position}`}>{displayPosition}</p>
                        <p className={`body ${styles.keywords}`}>
                            {displayKeywords}
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
                
                <img src={SwitchOn ? 'images/teamFunny.png' : 'images/team.png'} alt="teamPicture" className={styles.teamPicture}/>
            </div>
        </div>
    );
}