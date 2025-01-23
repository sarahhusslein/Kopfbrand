"use client"
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
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

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [SwitchOn, setSwitchOn] = useState(false);
    const [hoveredMember, setHoveredMember] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [displayPosition, setDisplayPosition] = useState('');
    const [displayKeywords, setDisplayKeywords] = useState('');
    const [mousePosition, setMousePosition] = useState({ 
        x: 0, 
        y: 0, 
    });

    const controls = useAnimation();
    const svgControls = useAnimation();

    const warningText = [
        { text: "Nicht", isSpace: false },
        { text: " ", isSpace: true },
        { text: "drücken!", isSpace: false },
    ];

    

    // Add useInView hook
    const { ref: teamImageRef, inView } = useInView({
        threshold: 0.8, // Trigger when 80% of the component is visible
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

    const itemAnimation = {
        initial: { y: 40, opacity: 0 },
        inView: {
            y: 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                ease: "easeInOut",
                duration: 0.7
            }
        }
    }; 

    // Add useEffect to start the handwriting animation after parent animations
    useEffect(() => {
        // Delay matches or is slightly longer than your itemAnimation duration
        const timer = setTimeout(() => {
            controls.start("visible");
        }, 800); // 800ms = 0.8s delay after parent animations

        return () => clearTimeout(timer);
    }, [controls]);

    // Calculate total duration of text animation
    const totalTextDuration = warningText.reduce((total, segment) => {
        if (!segment.isSpace) {
            return total + (segment.text.length * 0.02) + 0.1; // char delay + word delay
        }
        return total;
    }, 0);

    return (
        <div className={styles.container}>

            <motion.div 
            variants={itemAnimation}
            initial="initial"
            whileInView="inView"
            viewport={{ once: false, amount: 0.3 }}
            >
                <motion.h1 className={`h1 ${styles.h1}`} variants={itemAnimation}>
                    WIR STELLEN UNS VOR
                </motion.h1>
                <motion.h4 className={`subtitle ${styles.h4}`} variants={itemAnimation}>
                    Jetzt mal ehrlich, hast du dich uns so vorgestellt? 
                    {isMobile ? ' ' : <br />}
                    85 Jahre Berufserfahrung, 7000 Stunden Calls und ein Lächeln auf Knopfdruck - das ist unser Team.
                </motion.h4>
                <div className={styles.switchContainer}>
                    <motion.p 
                        className={`handschrift-small ${styles.handschrift}`}
                        initial="hidden"
                        viewport={{ once: false }}
                        onViewportLeave={() => {
                            controls.start("hidden");
                            svgControls.start("hidden");
                        }}
                        onViewportEnter={() => {
                            setTimeout(() => {
                                controls.start("visible");
                                setTimeout(() => {
                                    svgControls.start("visible");
                                }, totalTextDuration * 1000);
                            }, 800);
                        }}
                    >
                        {warningText.map((segment, segmentIndex) => (
                            <span key={segmentIndex}>
                                {segment.isSpace ? (
                                    <span> </span>
                                ) : (
                                    segment.text.split('').map((char, charIndex) => (
                                        <motion.span
                                            key={`warning-${segmentIndex}-${charIndex}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={controls}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                            transition={{
                                                duration: 0.15,
                                                delay: (segmentIndex * 0.08) + (charIndex * 0.04) + (Math.random() * 0.02),
                                                ease: "easeOut"
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))
                                )}
                            </span>
                        ))}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={svgControls}
                        variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ 
                            duration: 0.5,
                            ease: "easeOut"
                        }}
                    >
                        <SVG src={'illustrations/arrowStraightRight.svg'} className={styles.arrow}/>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={svgControls}
                        variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 }
                        }}
                        transition={{ 
                            duration: 0.4,
                            delay: 0.2,
                            ease: "easeOut"
                        }}
                    >
                        <motion.div
                            className={styles.switchPulse}
                            whileHover={{
                                scale: 1.05,
                                transition: { 
                                    duration: 0.1, 
                                    ease: "easeInOut"
                                } 
                            }}
                            animate={{
                                scale: [1, 1.05, 1],
                                transition: {
                                    delay: 0.5,
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    repeatDelay: 0.5
                                }
                            }}
                        >
                            <div className={styles.switchWrapper}>
                                <motion.div 
                                    className={styles.switchLayer}
                                    animate={{ opacity: SwitchOn ? 0 : 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <SVG src='illustrations/switchOff.svg' onClick={handleSwitchToggle} />
                                </motion.div>
                                <motion.div 
                                    className={styles.switchLayer}
                                    animate={{ opacity: SwitchOn ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <SVG src='illustrations/switchOn.svg' onClick={handleSwitchToggle} />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {isMobile ? ( 
                    <div className={styles.teamImageContainerMobile}>
                        <img src={SwitchOn ? 'images/teamFunny.png' : 'images/team.png'} alt="teamPicture" className={styles.teamPictureMobile}/>
                        <div className={styles.funFactRow}>
                            {teamMembers.map((member) => (
                                <div className={styles.funFact} key={member.id}>
                                    <h3 className={`h3 ${styles.name}`}>{member.name}</h3>
                                    <p className={`body-light ${styles.position}`}>{member.position}</p>
                                    <p className={`body ${styles.keywordsMobile}`}>
                                        {member.keywords.map((keyword, index) => (
                                            <React.Fragment key={index}>
                                                {keyword}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (

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
                )}
            </motion.div>
        </div>
    );
}