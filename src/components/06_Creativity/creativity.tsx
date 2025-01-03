"use client";
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import styles from './creativity.module.css';
import SVG from 'react-inlinesvg';
import { ReactSketchCanvas, type ReactSketchCanvasRef,} from "react-sketch-canvas";
import Lottie from 'lottie-react'; 
import drawingAnimation from '../../../public/animations/drawingAnimation.json';
import { motion, useTransform, useScroll, useAnimation } from 'framer-motion';



export default function Creativity() {

  const container = useRef(null);

  const { scrollYProgress: parallaxScrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start 30vh"]
  });

  // Background (slowest)
  const paperY = useTransform(parallaxScrollYProgress, [0, 1], [100, 0]);  

  // Middle layer (medium speed)
  const paletteY = useTransform(parallaxScrollYProgress, [0, 1], [150, 100]);
  const toolsY = useTransform(parallaxScrollYProgress, [0, 1], [150, 0]);

  // Foreground (fastest)
  const canvasY = useTransform(parallaxScrollYProgress, [0, 1], [250, 0]);  

  // Ref for the canvas
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState ("#EEFF04");
  const [hasDrawn, setHasDrawn] = useState (false); 

  const handleReset = () => {
    canvasRef.current?.resetCanvas(); // Optional chaining to avoid null reference
    setHasDrawn(false);
    console.log(hasDrawn);
  };

  const handleDrawing = (drawingData: any) => { // Specify the correct type for drawingData if known
    console.log("Drawing detected."); 
    if (drawingData.length > 0) { // Ensure drawing data is not empty
      setHasDrawn(true);
    }
  };

  async function handleScreenshot() {
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

  const initialRotations = "KREATIVITÄT".split('').map(() => Math.random() * 360 - 180);

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

        {/* Canvas */}
        <div 
        ref={container}
        className={styles.canvasContainer} 
        >
          <div className={styles.mockupWrapper}>
            {/* Background layer */}
            <motion.img src={'images/paper.png'} className={styles.paper} style={{ y: paperY, zIndex: 1}}/>
            
            {/* Middle layer */}
            <motion.div style={{ y: paletteY }}>
              <SVG src={'illustrations/palette.svg'} className={styles.palette}/>
            </motion.div>
            <motion.div style={{ y: toolsY, zIndex: 2 }}>
              <SVG src={'illustrations/tools.svg'} className={styles.tools}/>
            </motion.div>
            
            {/* Foreground layer */}
            <motion.div className={styles.canvas} style={{ y: canvasY, zIndex: 3 }}>
              <SVG src={'illustrations/iPadMockup.svg'} className={styles.mockup}/>
              <div className={styles.drawingContainer}>
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
                    <SVG src="icons/reset.svg" className={styles.iconReset} onClick={handleReset} />
                    <SVG src="icons/screenshot.svg" className={styles.iconScreenshot} onClick={handleScreenshot} />
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

        {/* Text */}
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
                <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVG} />
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

    </div>
  );
}
