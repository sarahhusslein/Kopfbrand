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

  /***************************** 
  State Declarations
  *****************************/
  // 🟢 States, Refs and Device Types
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const container = useRef(null);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const drawingContainerRef = useRef<HTMLDivElement>(null);
  const [isYellowActive, setIsYellowActive] = useState(true);
  const cursorUrl = isYellowActive ? '/icons/cursorDrawingYellow.svg' : '/icons/cursorDrawingRed.svg';
  const strokeColor = isYellowActive ? '#EEFF04' : '#E4003E';
  const iconSrc = isYellowActive ? 'icons/colorChangeYellow.svg' : 'icons/colorChangeRed.svg';
  const toggleBackground = isYellowActive ? styles.toggleRed : styles.toggleYellow;
  const [hasDrawn, setHasDrawn] = useState (false); 
  const cursorStyle = {
    '--cursor-url': `url(${cursorUrl})`
  } as React.CSSProperties;
  const headlineRef = useRef<HTMLDivElement>(null);
  const [initialRotations, setInitialRotations] = useState<number[]>([]);
  const controls = useAnimation();




  /***************************** 
  Animations
  *****************************/
  // 🟢 Effect to handle scroll progress tracking
  const { scrollYProgress: parallaxScrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start 30vh"]
  });

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start 95%", "end 50%"] 
  });

  // 🟢 Parallax animations for the layers
  const paperY = useTransform(parallaxScrollYProgress, [0, 1], [100, 0]);  
  const paletteY = useTransform(parallaxScrollYProgress, [0, 1], [150, 100]);
  const toolsY = useTransform(parallaxScrollYProgress, [0, 1], [170, 0]);
  const canvasY = useTransform(parallaxScrollYProgress, [0, 1], [300, 0]);  

  // 🟢 Effect to set initial rotations for the headline
  useEffect(() => {
    const rotations = "KREATIVITÄT".split('').map(() => Math.random() * 360 - 180);
    setInitialRotations(rotations);
  }, []); // Only on the first client render


  /***************************** 
  Functions
  *****************************/
  // 🟢 Handle reset
  const handleReset = () => {
    canvasRef.current?.resetCanvas(); // Optional chaining to avoid null reference
    setHasDrawn(false);
    console.log(hasDrawn);
  };

  // 🟢 Handle color change
  const handleColorChange = () => {
    setIsYellowActive(!isYellowActive);
  };

  // 🟢 Handle drawing
  const handleDrawing = (drawingData: any) => { 
    console.log("Drawing detected."); 
    if (drawingData.length > 0) { 
      setHasDrawn(true);
    }
  };

  // 🟢 Handle screenshot
  async function handleScreenshot() {
    if (typeof window !== 'undefined') { 
        const flashEffect = document.createElement('div');
        flashEffect.id = 'flashEffect';

        console.log(drawingContainerRef.current);
        console.log(flashEffect);

        if (drawingContainerRef.current) {
            const drawingContainer = drawingContainerRef.current;
            drawingContainer.appendChild(flashEffect);  
            flashEffect.classList.add('flash');
            flashEffect.style.position = 'absolute';
            flashEffect.style.top = '0';
            flashEffect.style.left = '0';
            flashEffect.style.width = '100%';
            flashEffect.style.height = '100%';
            flashEffect.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            flashEffect.style.zIndex = '9999';
            flashEffect.style.opacity = '0'; 
            flashEffect.style.pointerEvents = 'none';
            flashEffect.style.transition = 'opacity 0.3s ease-in-out'; 

            setTimeout(() => {
                flashEffect.style.opacity = '1'; 
            }, 50); 

            // 🟢 Flash effect after a short duration
            setTimeout(() => {
                flashEffect.style.opacity = '1'; 
            }, 100); 

            // 🟢 Flash effect after a further short duration
            setTimeout(() => {
                flashEffect.style.opacity = '0'; 
            }, 400); 

            // 🟢 Flash effect after the fade-out
            setTimeout(() => {
                flashEffect.remove(); 
            }, 700); 
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



  // 🟢 Text arrays for the handwriting animation
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

  

  /***************************** 
  Render
  *****************************/
  return (
    
      <div className={styles.container}>

        {isMobile ? ( 
          <div>

            {/****** Text Container ******/}
            <motion.div 
              className={styles.textContainer} 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.7, ease: "easeInOut"}}
            >

                {/****** Headline ******/}
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

                {/****** Handschrift and Arrow ******/}
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

                  {/****** Arrow ******/}
                  <SVG aria-label="Pfeil" src={'illustrations/arrowBottomLeft.svg'} className={styles.arrow}/>
                </div>
            </motion.div>

            {/****** Canvas Container ******/}
            <div className={styles.canvasContainer}> 
              <div className={styles.mockupWrapper}> 
                {/****** Background layer ******/}
                <motion.img aria-label="Papier" src={'images/paper.png'} className={styles.paper} style={{ y: paperY, zIndex: 1}} alt="Papier"/>
                
                
                {/****** Middle layer ******/}
                <motion.div style={{ y: paletteY }}>
                  <SVG aria-label="Palette" src={'illustrations/palette.svg'} className={styles.palette}/>
                </motion.div>
                <motion.div style={{ y: toolsY, zIndex: 3, position: 'relative' }}>
                  <SVG aria-label="Tools" src={'illustrations/tools.svg'} className={styles.tools}/>
                </motion.div>

                {/****** Foreground layer ******/}
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
          {/****** Canvas Container ******/}
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

          
          {/****** Text Container ******/}
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
