"use client"
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useInView } from 'react-intersection-observer'; 
import styles from './team.module.css';
import SVG from 'react-inlinesvg';


/***************************** 
Type Declarations and Arrays
*****************************/
// 🟢 Type for the team members
interface TeamMember {
    id: number;
    name: string;
    position: string;
    keywords: string[];
}

// 🟢 Team members array
const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Christoph Bäumler",
        position: "Gründer & CEO",
        keywords: ["#fastfoodjunkie", "#aufderberghütte", "#grünerdaumen"],
    },
    {
        id: 2,
        name: "Victoria Reuter",
        position: "Art Direction",
        keywords: ["#rundumversorgerin", "#coffeejunkie", "#dogmommy"],
    },
    {
        id: 3,
        name: "Christina Hansen",
        position: "Art Direction",
        keywords: ["#mrssunshine", "#gipfelstürmerin", "#everydayisthebestday"],
    },
    {
        id: 4,
        name: "Corinna Moritz",
        position: "Art Direction",
        keywords: ["#immerbilderimkopf", "#anappleeachday", "#fürjedenspasszuhaben"],
    },
    // {
    //     id: 5,
    //     name: "Patricia Reiter",
    //     position: "Werkstudentin",
    //     keywords: ["#agenturküken", "#bäckerinmitleidenschaft", "#filmgeek"],
    // }
];

// 🟢 Type for the mouse position
interface MousePosition {
    x: number;
    y: number;
    shouldOffsetLeft: boolean;
    tiltAngle?: number;
}

// 🟢 Type for the sparks
interface Spark {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    velocityX: number;
    velocityY: number;
    lifespan: number;
}



export default function Team() {

    /***************************** 
    State Declarations
    *****************************/
    // 🟢 States, Refs and Device Types
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [SwitchOn, setSwitchOn] = useState<boolean>(false);
    const [sparks, setSparks] = useState<Spark[]>([]);
    const [hoveredMember, setHoveredMember] = useState<number | null>(null);
    const [displayName, setDisplayName] = useState<string>('');
    const [displayPosition, setDisplayPosition] = useState<string>('');
    const [displayKeywords, setDisplayKeywords] = useState<string>('');
    const [mousePosition, setMousePosition] = useState<MousePosition>({ 
        x: 0, 
        y: 0, 
        shouldOffsetLeft: false,
    });
    const controls = useAnimation();
    const svgControls = useAnimation();

    // 🟢 Warning text array
    const warningText = [
        { text: "Nicht", isSpace: false },
        { text: " ", isSpace: true },
        { text: "drücken!", isSpace: false },
    ];

    

    // 🟢 Ref and inView state for the team image
    const { ref: teamImageRef, inView } = useInView({
        threshold: 0.8, // Trigger when 80% of the component is visible
    });
    

    /***************************** 
    Functions
    *****************************/
    // 🟢 Trigger default member display when component comes into view
    useEffect(() => {
        if (inView) {
            const defaultMember = teamMembers[2]; 
            setHoveredMember(defaultMember.id);
            setMousePosition({
                x: window.innerWidth / 2,
                y: 200,
                shouldOffsetLeft: false
            });
            animateText(defaultMember);
        }
    }, [inView]); 


    // 🟢 Handle switch toggle
    const handleSwitchToggle = () => {
        setSwitchOn(prevState => !prevState); 
    };

    // 🟢 Animate text for the hovered member
    const animateText = (member: TeamMember) => {
        // 🟢 Reset all text when starting new animation
        setDisplayName('');
        setDisplayPosition('');
        setDisplayKeywords('');
        
        // 🟢 Animate name first
        let nameIndex = 0;
        const nameTimer = setInterval(() => {
            if (nameIndex <= member.name.length) {
                setDisplayName(member.name.slice(0, nameIndex));
                nameIndex++;
            } else {
                clearInterval(nameTimer);
                // 🟢 Start position animation only after name is complete
                let posIndex = 0;
                const posTimer = setInterval(() => {
                    if (posIndex <= member.position.length) {
                        setDisplayPosition(member.position.slice(0, posIndex));
                        posIndex++;
                    } else {
                        clearInterval(posTimer);
                        // 🟢 Start keywords animation only after position is complete
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

    // 🟢 Handle mouse move for the hovered member
    const handleMouseMove = (e: React.MouseEvent, memberId: number) => {
        if (typeof window !== 'undefined') { // 🟢 Check if running in the browser
            const containerRect = e.currentTarget.closest(`.${styles.teamImageContainer}`).getBoundingClientRect();
            const x = e.clientX - containerRect.left;
            const y = e.clientY - containerRect.top;

            // 🟢 Calculate relative position (0 to 1) across the width
            const relativeX = x / containerRect.width;
            
            // 🟢 Calculate tilt angle (-15 to 15 degrees)
            // Center (0.5) = 0 degrees, Left edge = -15 degrees, Right edge = 15 degrees
            const tiltAngle = (relativeX - 0.5) * 30;
            
            // 🟢 Calculate if the bubble would go off-screen
            const bubbleWidth = 290; // width from CSS
            const screenWidth = window.innerWidth;
            const bubbleRightEdge = e.clientX + bubbleWidth;
            
            // 🟢 Determine which transform to use
            const shouldOffsetLeft = bubbleRightEdge > screenWidth;

            if (memberId !== hoveredMember) {
                const member = teamMembers[memberId - 1];  
                animateText(member);  
            }
        
            setMousePosition({
                x: x,
                y: y,
                shouldOffsetLeft: shouldOffsetLeft,
                tiltAngle: tiltAngle
            });
             
            if (memberId !== hoveredMember) {
                setHoveredMember(memberId);
            }
        }
    };

    /***************************** 
    Animations
    *****************************/
    // 🟢 Item animation for the team container
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

    // 🟢 Handwriting animation for the switch
    const handwritingAnimation = {
        initial: { opacity: 0 },
        inView: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    

    // 🟢 Calculate total duration of text animation
    const totalTextDuration = warningText.reduce((total, segment) => {
        if (!segment.isSpace) {
            return total + (segment.text.length * 0.02) + 0.1; // char delay + word delay
        }
        return total;
    }, 0);

    // 🟢 Add useEffect to start the handwriting animation after parent animations
    useEffect(() => {
        if (inView) {
            const enterTimeout = setTimeout(() => {
                controls.start("visible");
                const svgTimeout = setTimeout(() => {
                    svgControls.start("visible");
                }, totalTextDuration * 1000);
    
                return () => clearTimeout(svgTimeout);
            }, 800);
    
            return () => clearTimeout(enterTimeout);
        } else {
            controls.start("hidden");
            svgControls.start("hidden");
        }
    }, [inView]); 


    // 🟢 Get random flame color
    const getRandomFlameColor = () => {
        const r = Math.floor(228 + Math.random() * (230 - 228)); 
        const g = Math.floor(Math.random() * 256); 
        const b = Math.floor(Math.random() * 63); 
        return `rgb(${r}, ${g}, ${b})`;
    };

    // 🟢 Effect to handle switch toggle
    useEffect(() => {
        if (!SwitchOn) return; 
    
        const button = document.querySelector(`.${styles.switchWrapper}`);
        if (!button) return;
    
    
        // 🟢 Create 100 sparks in a circle, moving explosively
        const newSparks = Array.from({ length: 100 }, () => {
            const id = Date.now() + Math.random();
            const angle = Math.random() * Math.PI * 2; 
            const speed = Math.random() * 150 + 150; 
    
            return {
                id,
                x: 0,
                y: 0,
                size: Math.random() * 8 + 4,
                color: getRandomFlameColor(),
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
                lifespan: Math.random() * 3000 + 2000,
            };
        });
    
        setSparks(newSparks); 
    

        setTimeout(() => {
            setSparks([]);
        }, Math.max(...newSparks.map(s => s.lifespan)));
    
    }, [SwitchOn]); 
    
    
    


    /***************************** 
    Render
    *****************************/
    return (
        <div className={styles.container}>

            <motion.div 
                variants={itemAnimation}
                initial="initial"
                whileInView="inView"
                viewport={{ once: false, amount: 0.3 }}
            >

                {/****** Headline ******/}
                <motion.h1 className={`h1 ${styles.h1}`} variants={itemAnimation}>
                    KREATIVE KÖPFE
                </motion.h1>
                <motion.h4 className={`subtitle ${styles.h4}`} variants={itemAnimation}>
                    125 Jahre Berufserfahrung, 7000 Stunden Calls und ein Lächeln auf Knopfdruck - das ist unser Team!
                    {/* {isMobile ? ' ' : <br />}
                    85 Jahre Berufserfahrung, 7000 Stunden Calls und ein Lächeln auf Knopfdruck - das ist unser Team. */}
                </motion.h4>

                {/****** Switch  including handwriting text animation******/}
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

                    {/****** Arrow ******/}
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
                        <SVG aria-label="Pfeil" src={'illustrations/arrowStraightRight.svg'} className={styles.arrow}/>
                    </motion.div>

                    {/****** Switch Pulse ******/}
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

                                {/****** Sparks Effect ******/}
                                <div className={styles.sparkContainer}>
                                {sparks.map((spark) => (
                                    <motion.div
                                        key={spark.id}
                                        className={styles.spark}
                                        initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                        animate={{ 
                                            x: spark.velocityX, 
                                            y: spark.velocityY, 
                                            opacity: 0, // Smooth ausfaden
                                            scale: [1, 0.8, 0.6] 
                                        }}
                                        transition={{ duration: spark.lifespan / 1000, type: "tween", ease: "backOut" }}
                                        style={{
                                            backgroundColor: spark.color,
                                            width: spark.size,
                                            height: spark.size,
                                            borderRadius: '50%',
                                            position: 'absolute',
                                        }}
                                    />
                                ))}
                            </div>


                                <motion.div 
                                    className={styles.switchLayer}
                                    animate={{ opacity: SwitchOn ? 0 : 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <SVG aria-label="Schalter aus" src='illustrations/switchOff.svg' onClick={handleSwitchToggle} />
                                </motion.div>
                                <motion.div 
                                    className={styles.switchLayer}
                                    animate={{ opacity: SwitchOn ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <SVG aria-label="Schalter an" src='illustrations/switchOn.svg' onClick={handleSwitchToggle} />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {isMobile ? ( 
                    <div className={styles.teamImageContainerMobile}>

                        {/****** Team Picture ******/}
                        <img aria-label="Team Foto" src={SwitchOn ? 'images/teamFunny.png' : 'images/team.png'} alt="Team Foto" className={styles.teamPictureMobile}/>

                        {/****** Fun Facts ******/}
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

                    {/****** Fun FactHovered Member ******/}
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
                    <img aria-label="Team Foto" src={SwitchOn ? 'images/teamFunny.png' : 'images/team.png'} alt="Team Foto" className={styles.teamPicture}/>
                </div>
                )}
            </motion.div>
        </div>
    );
}