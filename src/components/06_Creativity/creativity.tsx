"use client";
import React, { useRef, useState, useEffect } from 'react';
import styles from './creativity.module.css';
import SVG from 'react-inlinesvg';
import { ReactSketchCanvas, type ReactSketchCanvasRef,} from "react-sketch-canvas";
import Lottie from 'lottie-react'; 
import drawingAnimation from '../../../public/animations/drawingAnimation.json';
import { motion, useTransform, useScroll } from 'framer-motion';





export default function Creativity() {

  // Create a ref for the canvas
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
    offset: ["start 95%", "end 40%"] //Animation will start when the element's start is 95% down the viewport and end when the element's end is 30% down the viewport.
  });

  const initialRotations = "KREATIVITÄT".split('').map(() => Math.random() * 360 - 180);

  return (
    <div className={styles.container}>
        <motion.div 
        className={styles.canvasContainer} 
        initial={{ y: 40, opacity: 0, scale: 0.8 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.05}}
        transition={{ duration: 0.5, ease: "easeInOut"}}
        >
          <div className={styles.mockupWrapper}>
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
            <img src={'images/paper.png'} className={styles.paper}/>
            <SVG src={'illustrations/palette.svg'} className={styles.palette}/>
            <SVG src={'illustrations/tools.svg'} className={styles.tools}/>
          </div>
          {hasDrawn && (
            <p className={`body-highlighted ${styles.bodyHighlighted}`}>
              Fertig gezaubert? Klick auf die Kamera und schick uns dein Meisterwerk.
            </p>
          )}
        </motion.div>
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
              // initial={{color: "#1D1E22"}}
              // whileHover={{color: ["#E61951", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#FFB6C1", "#FF69B4", "#EF7E9D", "#F6C9D6", "#E8EF8B", "#1D1E22"]}}
              // animate={{color: ["#E61951", "#EF7E9D", "#F6C9D6", "#E8EF8B", "#1D1E22", ]}}
              // transition={{duration:10, repeat: Infinity, ease: "linear"}}
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
          <p className={`handschrift ${styles.handschrift}`}>
            Leben<span className={styles.smallSpace}> </span>wir.
            <span className={styles.smallSpace}> </span>Lieben
            <span className={styles.smallSpace}> </span>wir.<br />
            Zeichne<span className={styles.smallSpace}> </span>dich
            <span className={styles.smallSpace}> </span>aus.
          </p>
          {/* <SVG src={'illustrations/arrowBottomLeft.svg'} className={styles.arrow}/> */}
        </motion.div>

    </div>
  );
}
