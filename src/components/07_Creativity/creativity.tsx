"use client";
import React, { useRef, useState, useEffect } from 'react';
import styles from './creativity.module.css';
import SVG from 'react-inlinesvg';
import { ReactSketchCanvas, type ReactSketchCanvasRef,} from "react-sketch-canvas";
import Lottie from 'lottie-react'; 
import drawingAnimation from '../../../public/animations/drawingAnimation.json';




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



  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer}>
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
      </div>
      <div className={styles.textContainer}>
        <h1 className={`h1 ${styles.h1}`}>
          KREAT
          <br />
          <span className={styles.underline}> 
            IVITÄT
            <SVG src={'/illustrations/underlineHanddrawn.svg'} className={styles.SVG}/>
          </span>
        </h1>
        <p className={`handschrift ${styles.handschrift}`}>
          Leben<span className={styles.smallSpace}> </span>wir.
          <span className={styles.smallSpace}> </span>Lieben
          <span className={styles.smallSpace}> </span>wir.<br />
          Zeichne<span className={styles.smallSpace}> </span>dich
          <span className={styles.smallSpace}> </span>aus.
        </p>
        {/* <SVG src={'illustrations/arrowBottomLeft.svg'} className={styles.arrow}/> */}
      </div>
    </div>
  );
}