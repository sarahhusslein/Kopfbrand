"use client";
import React, { useRef, useState } from 'react';
import styles from './creativity.module.css';
import SVG from 'react-inlinesvg';
import { ReactSketchCanvas } from "react-sketch-canvas";


export default function Creativity() {


  // Create a ref for the canvas
  const canvasRef = useRef(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  const handleReset = () => {
    canvasRef.current.resetCanvas();
    setHasDrawn(false);
  };

  const handleDrawing = () => {
    setHasDrawn(true); // Update state when drawing starts
  };

  const handleScreenshot = async () => {
    if (canvasRef.current) {
        try {
            const imageData = await canvasRef.current.exportImage("png");
            console.log("Exported image data:", imageData);

            if (!imageData) {
                console.error("No image data returned from exportImage.");
                return;
            }

            const link = document.createElement("a");
            link.href = imageData;
            link.download = "meisterwerk.png";
            link.click();
        } catch (error) {
            console.error("Error taking screenshot:", error);
        }
    }
  };


    return (
      <div className={styles.container}>
        <div className={styles.canvasContainer}>
            <div className={styles.mockupWrapper}> 
              <SVG src={'illustrations/iPadMockup.svg'} className={styles.mockup}/>
              <div className={styles.drawingContainer}>
                <ReactSketchCanvas 
                  ref={canvasRef} 
                  width="100%"
                  height="100%"
                  canvasColor="#262626"
                  strokeWidth={3}
                  strokeColor="var(--broom)"
                  allowOnlyPointerType="all" 
                  onChange={handleDrawing}/>
                {hasDrawn && ( // Icons appear only if the user has drawn
                  <div className={styles.iconContainer}>
                      <SVG src="icons/reset.svg" className={styles.icon} onClick={handleReset} />
                      <SVG src="icons/screenshot.svg" className={styles.icon} onClick={handleScreenshot} />
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
                    KREAT<br />
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
            <SVG src={'illustrations/arrowBottomLeft.svg'} className={styles.arrow}/>
        </div>
      </div>
    );
  }