"use client";
import dynamic from 'next/dynamic';
import React, { useRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, useTransform, useScroll, useAnimation } from 'framer-motion';
import styles from './creativity.module.css';
import SVG from 'react-inlinesvg';
import { ReactSketchCanvas, type ReactSketchCanvasRef,} from "react-sketch-canvas";
import drawingAnimation from '../../../public/animations/drawingAnimation.json';


const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Creativity() {

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const container = useRef(null);

  const { scrollYProgress: parallaxScrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start 30vh"]
  });

  // Background (slowest)
  const paperY = useTransform(parallaxScrollYProgress, [0, 1], [100, 0]);  

  // Middle layer (medium speed)
  const paletteY = useTransform(parallaxScrollYProgress, [0, 1], [150, 100]);
  const toolsY = useTransform(parallaxScrollYProgress, [0, 1], [170, 0]);

  // Foreground (fastest)
  const canvasY = useTransform(parallaxScrollYProgress, [0, 1], [300, 0]);  

  // Ref for the canvas
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const drawingContainerRef = useRef<HTMLDivElement>(null);
  const [isYellowActive, setIsYellowActive] = useState(true);
  const cursorUrl = isYellowActive ? '/icons/cursorDrawingYellow.svg' : '/icons/cursorDrawingRed.svg';
  const strokeColor = isYellowActive ? '#EEFF04' : '#E4003E';
  const iconSrc = isYellowActive ? 'icons/colorChangeRed.svg' : 'icons/colorChangeYellow.svg';
  const toggleBackground = isYellowActive ? styles.toggleRed : styles.toggleYellow;
  const [hasDrawn, setHasDrawn] = useState (false); 

  const handleReset = () => {
    canvasRef.current?.resetCanvas(); // Optional chaining to avoid null reference
    setHasDrawn(false);
    console.log(hasDrawn);
  };

  const handleColorChange = () => {
    setIsYellowActive(!isYellowActive);
  };


  const cursorStyle = {
    '--cursor-url': `url(${cursorUrl})`
  } as React.CSSProperties;



  const handleDrawing = (drawingData: any) => { 
    console.log("Drawing detected."); 
    if (drawingData.length > 0) { // Ensure drawing data is not empty
      setHasDrawn(true);
    }
  };

  async function handleScreenshot() {
    if (typeof window !== 'undefined') { // Check if running in the browser
        // Blitz-Effekt anzeigen
        const flashEffect = document.createElement('div');
        flashEffect.id = 'flashEffect';

        console.log(drawingContainerRef.current);
        console.log(flashEffect);

        if (drawingContainerRef.current) {
            const drawingContainer = drawingContainerRef.current;
            drawingContainer.appendChild(flashEffect);  // Blitz-Effekt wird dem drawingContainer hinzugefügt
            flashEffect.classList.add('flash');
            flashEffect.style.position = 'absolute';
            flashEffect.style.top = '0';
            flashEffect.style.left = '0';
            flashEffect.style.width = '100%';
            flashEffect.style.height = '100%';
            flashEffect.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            flashEffect.style.zIndex = '9999';
            flashEffect.style.opacity = '0'; // Anfangs unsichtbar
            flashEffect.style.pointerEvents = 'none';
            flashEffect.style.transition = 'opacity 0.3s ease-in-out'; // Schneller Übergang

            // Blitz-Effekt anzeigen (mit einer kleinen Verzögerung)
            setTimeout(() => {
                flashEffect.style.opacity = '1'; // Blitz wird sichtbar
            }, 50); // Sehr kurze Verzögerung für ein schnelles Aufblitzen

            // Blitz-Effekt nach einer kurzen Dauer langsam wieder verschwinden lassen
            setTimeout(() => {
                flashEffect.style.opacity = '1'; // Sanftes, langsames Ausblenden
            }, 100); // 0.2 Sekunden nach dem Aufblitzen

            // Blitz-Effekt nach einer weiteren kurzen Zeit vollständig entfernen
            setTimeout(() => {
                flashEffect.style.opacity = '0'; // Letztes Ausblenden
            }, 400); // Nach der Dauer der sanften Fade-Animation

            // Blitz-Effekt nach dem Ausblenden aus dem DOM entfernen
            setTimeout(() => {
                flashEffect.remove(); // Blitz-Effekt aus dem DOM entfernen
            }, 700); // Entfernen nach der vollständigen Animation
        } else {
            console.log('drawingContainerRef ist nicht gesetzt!');
        }

        setTimeout(async () => {
            const dataURL = await canvasRef.current?.exportImage('png');
            if (dataURL) {
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'meisterwerk.png';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        }, 700);
    }
  }

  useEffect(() => {
    console.log("hasDrawn:", hasDrawn);
  }, [hasDrawn]); // Runs whenever hasDrawn changes


  // Scroll-controlled animation for the headline
  const headlineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start 95%", "end 50%"] //Animation will start when the element's start is 95% down the viewport and end when the element's end is 40% down the viewport.
  });

  const [initialRotations, setInitialRotations] = useState<number[]>([]);

  useEffect(() => {
    const rotations = "KREATIVITÄT".split('').map(() => Math.random() * 360 - 180);
    setInitialRotations(rotations);
  }, []); // Nur beim ersten Client-Renden


  

  // const [randomDelays, setRandomDelays] = useState<number[]>([]);
  // const [randomDelays2, setRandomDelays2] = useState<number[]>([]);


  // // Führe dies im useEffect aus, um den Zufallswert nur auf dem Client zu generieren.
  // useEffect(() => {
  //   const delays = Array.from({ length: line1.length }).map(() => Math.random() * 0.03);
  //   setRandomDelays(delays);
  // }, []);

  // useEffect(() => {
  //   const delays = Array.from({ length: line2.length }).map(() => Math.random() * 0.03);
  //   setRandomDelays2(delays);
  // }, [line2.length]); // Setzt die Zufallswerte jedes Mal neu, wenn sich line2 ändert
  


  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);

  const line1 = [
    { text: "Leben", isSpace: false },
    { text: " ", isSpace: true },
    { text: "wir.", isSpace: false },
    { text: " ", isSpace: true },
    { text: "Lieben", isSpace: false },
    { text: " ", isSpace: true },
    { text: "wir.", isSpace: false },
  ];

  const line2 = [
    { text: "Zeichne", isSpace: false },
    { text: " ", isSpace: true },
    { text: "dich", isSpace: false },
    { text: " ", isSpace: true },
    { text: "aus.", isSpace: false },
  ];

  

  return (
    
      <div className={styles.container}>

        {isMobile ? ( 
          <div>
            {/* Text Container */}
            <motion.div 
            className={styles.textContainer} 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.7, ease: "easeInOut"}}
            >
                {/* Headline */}
                <div ref={headlineRef} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.h1 
                    className={`h1 ${styles.h1}`}
                  >
                    {"KREAT".split('').map((letter, index) => (
                      <motion.span
                        key={index}
                        style={{
                          display: 'inline-block',
                          margin: '0 2px',
                          rotate: useTransform(scrollYProgress, [0, 0.9], [initialRotations[index], 0])
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                    <br />
                    <span className={styles.underline}>
                      {"IVITÄT".split('').map((letter, index) => (
                        <motion.span
                          key={index}
                          style={{
                            display: 'inline-block',
                            margin: '0 2px',
                            rotate: useTransform(scrollYProgress, [0, 0.9], [initialRotations[index + 5], 0])
                          }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                      <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVG} />
                    </span>
                  </motion.h1>
                </div>

                {/* Handschrift and Arrow */}
                <div className={styles.textAndArrowContainer}>
                  <motion.p 
                    className={`handschrift ${styles.handschrift}`}
                    viewport={{ 
                      once: false,  
                      amount: 0.9   
                    }}
                    onViewportEnter={() => {
                      controls.start("visible");
                    }}
                    onViewportLeave={() => {
                      controls.start("hidden");
                    }}
                  >
                    <span>
                      {line1.map((segment, segmentIndex) => (
                        <span key={segmentIndex}>
                          {segment.isSpace ? (
                            <span className={styles.smallSpace}>{segment.text}</span>
                          ) : (
                            segment.text.split('').map((char, charIndex) => (
                              <motion.span
                                key={`line1-${segmentIndex}-${charIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={controls}
                                variants={{
                                  hidden: { opacity: 0, y: 20 },
                                  visible: { opacity: 1, y: 0 }
                                }}
                                transition={{
                                  duration: 0.05,
                                  delay: (segmentIndex * 0.1) + (charIndex * 0.02) + (Math.random() * 0.03),
                                  ease: "easeOut"
                                }}
                              >
                                {char}
                              </motion.span>
                            ))
                          )}
                        </span>
                      ))}
                    </span>
                    <br />
                    <span>
                      {line2.map((segment, segmentIndex) => (
                        <span key={segmentIndex}>
                          {segment.isSpace ? (
                            <span className={styles.smallSpace}>{segment.text}</span>
                          ) : (
                            segment.text.split('').map((char, charIndex) => (
                              <motion.span
                                key={`line2-${segmentIndex}-${charIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={controls}
                                variants={{
                                  hidden: { opacity: 0, y: 20 },
                                  visible: { opacity: 1, y: 0 }
                                }}
                                transition={{
                                  duration: 0.05,
                                  delay: (line1.length * 0.1) + (segmentIndex * 0.1) + (charIndex * 0.02) + (Math.random() * 0.03),
                                  ease: "easeOut"
                                }}
                              >
                                {char}
                              </motion.span>
                            ))
                          )}
                        </span>
                      ))}
                    </span>
                  </motion.p>

                  {/* Arrow */}
                  <SVG aria-label="Pfeil" src={'illustrations/arrowBottomLeft.svg'} className={styles.arrow}/>
                </div>
            </motion.div>

            {/* Canvas Container */}
            <div className={styles.canvasContainer}> 
              <div className={styles.mockupWrapper}> 
                {/* Background layer */}
                <motion.img aria-label="Papier" src={'images/paper.png'} className={styles.paper} style={{ y: paperY, zIndex: 1}} alt="Papier"/>
                
                
                {/* Middle layer */}
                <motion.div style={{ y: paletteY }}>
                  <SVG aria-label="Palette" src={'illustrations/palette.svg'} className={styles.palette}/>
                </motion.div>
                <motion.div style={{ y: toolsY, zIndex: 3, position: 'relative' }}>
                  <SVG aria-label="Tools" src={'illustrations/tools.svg'} className={styles.tools}/>
                </motion.div>

                {/* Foreground layer */}
                <motion.div className={styles.canvas} style={{ y: canvasY, zIndex: 4 }}>
                  <SVG aria-label="iPhone Mockup" src={'illustrations/iPhoneMockup.svg'} className={styles.mockup}/>
                  <div 
                    className={`${styles.drawingContainer}`}
                    style={cursorStyle}
                  >
                    <ReactSketchCanvas 
                      className={styles.reactSketchCanvas}
                      ref={canvasRef} 
                      width="100%"
                      height="100%"
                      canvasColor="#000000"
                      strokeWidth={2}
                      strokeColor={strokeColor}
                      allowOnlyPointerType="all" 
                      onChange={handleDrawing} 
                    />
                    {!hasDrawn && (
                      <div className={styles.drawingPrompt}>
                        <Lottie 
                            animationData={drawingAnimation}
                            className={styles.drawingAnimation}
                            loop={true}
                            autoplay={true}
                        />
                      </div>
                    )}
                    {hasDrawn && ( 
                      <div className={styles.iconContainer}>
                        <SVG aria-label="Farbwechsel" src={iconSrc} className={`${styles.iconColorToggle} ${toggleBackground}`} onClick={handleColorChange} />
                        <SVG aria-label="Reset" src="icons/reset.svg" className={styles.iconReset} onClick={handleReset} />
                        <SVG aria-label="Screenshot" src="icons/screenshot.svg" className={styles.iconScreenshot} onClick={handleScreenshot} />
                      </div>
                    )}
                  </div>
                  {hasDrawn && (
                    <p className={`body-highlighted ${styles.bodyHighlighted}`}>
                      Fertig gezaubert? Klick auf die Kamera und schick uns dein Meisterwerk.
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          <>
          {/* Canvas Container */}
          <div 
          ref={container}
          className={styles.canvasContainer} 
          >
              <div className={styles.mockupWrapper}>
                {/* Background layer */}
                <motion.img aria-label="Papier" src={'images/paper.png'} className={styles.paper} style={{ y: paperY, zIndex: 1,}} alt="Papier"/>
                
                {/* Middle layer */}
                <motion.div style={{ y: paletteY }}>
                  <SVG aria-label="Palette" src={'illustrations/palette.svg'} className={styles.palette}/>
                </motion.div>
                <motion.div style={{ y: toolsY, zIndex: 3, position: 'relative',  }}>
                  <SVG aria-label="Tools" src={'illustrations/tools.svg'} className={styles.tools}/>
                </motion.div>
                
                {/* Foreground layer */}
                <motion.div className={styles.canvas} style={{ y: canvasY, zIndex: 4}}>
                  <SVG aria-label="iPad Mockup" src={'illustrations/iPadMockup.svg'} className={styles.mockup} />
                  <div 
                    className={`${styles.drawingContainer}`}
                    style={cursorStyle}
                    ref={drawingContainerRef}
                  >
                    <ReactSketchCanvas 
                      className={styles.reactSketchCanvas}
                      ref={canvasRef} 
                      width="100%"
                      height="100%"
                      canvasColor="#262626"
                      strokeWidth={3}
                      strokeColor={strokeColor}
                      allowOnlyPointerType="all" 
                      onChange={handleDrawing} 
                    />
                    {!hasDrawn && (
                      <div className={styles.drawingPrompt}>
                        <Lottie 
                            animationData={drawingAnimation}
                            className={styles.drawingAnimation}
                            loop={true}
                            autoplay={true}
                        />
                      </div>
                    )}
                    {hasDrawn && ( 
                      <div className={styles.iconContainer}>
                        <SVG aria-label="Farbwechsel" src={iconSrc} className={`${styles.iconColorToggle} ${toggleBackground}`} onClick={handleColorChange} />
                        <SVG aria-label="Reset" src="icons/reset.svg" className={styles.iconReset} onClick={handleReset} />
                        <SVG aria-label="Screenshot" src="icons/screenshot.svg" className={styles.iconScreenshot} onClick={handleScreenshot} />
                      </div>
                    )}
                  </div>
                  {hasDrawn && (
                    <p className={`body-highlighted ${styles.bodyHighlighted}`}>
                      Fertig gezaubert? Klick auf die Kamera und schick uns dein Meisterwerk.
                    </p>
                  )}
                </motion.div>
              </div>
          </div>

          
          {/* Text Container */}
          <motion.div 
          className={styles.textContainer} 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.05 }}
          transition={{ duration: 0.7, ease: "easeInOut"}}
          >
            <div ref={headlineRef} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <motion.h1 
                className={`h1 ${styles.h1}`}
              >
                {"KREAT".split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    style={{
                      display: 'inline-block',
                      margin: '0 2px',
                      rotate: useTransform(scrollYProgress, [0, 0.9], [initialRotations[index], 0])
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                <br />
                <span className={styles.underline}>
                  {"IVITÄT".split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      style={{
                        display: 'inline-block',
                        margin: '0 2px',
                        rotate: useTransform(scrollYProgress, [0, 0.9], [initialRotations[index + 5], 0])
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <SVG aria-label="Unterstreichung" src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVG} />
                </span>
              </motion.h1>
            </div>
            

            <motion.p 
              className={`handschrift ${styles.handschrift}`}
              viewport={{ 
                once: false,  
                amount: 0.9   
              }}
              onViewportEnter={() => {
                controls.start("visible");
              }}
              onViewportLeave={() => {
                controls.start("hidden");
              }}
            >
              <span>
                {line1.map((segment, segmentIndex) => (
                  <span key={segmentIndex}>
                    {segment.isSpace ? (
                      <span className={styles.smallSpace}>{segment.text}</span>
                    ) : (
                      segment.text.split('').map((char, charIndex) => (
                        <motion.span
                          key={`line1-${segmentIndex}-${charIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={controls}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          transition={{
                            duration: 0.05,
                            delay: (segmentIndex * 0.1) + (charIndex * 0.02) + (Math.random() * 0.03),
                            ease: "easeOut"
                          }}
                        >
                          {char}
                        </motion.span>
                      ))
                    )}
                  </span>
                ))}
              </span>
              <br />
              <span>
                {line2.map((segment, segmentIndex) => (
                  <span key={segmentIndex}>
                    {segment.isSpace ? (
                      <span className={styles.smallSpace}>{segment.text}</span>
                    ) : (
                      segment.text.split('').map((char, charIndex) => (
                        <motion.span
                          key={`line2-${segmentIndex}-${charIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={controls}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          transition={{
                            duration: 0.05,
                            delay: (line1.length * 0.1) + (segmentIndex * 0.1) + (charIndex * 0.02) + (Math.random() * 0.03),
                            ease: "easeOut"
                          }}
                        >
                          {char}
                        </motion.span>
                      ))
                    )}
                  </span>
                ))}
              </span>
            </motion.p>
            {/* <SVG src={'illustrations/arrowBottomLeft.svg'} className={styles.arrow}/> */}
          </motion.div>
          </>
        )
        }
      </div>
    
  );
}
