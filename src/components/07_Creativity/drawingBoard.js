"use client";
import React, { useRef } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import styles from './drawingBoard.module.css';
import SVG from 'react-inlinesvg';



export default function DrawingBoard() {

    // Create a ref for the canvas
    const canvasRef = useRef(null);

    const handleReset = () => {
        canvasRef.current.resetCanvas();
    };



    const handleScreenshot = async () => {
        if (canvasRef.current) {
            try {
                // Export the canvas as a PNG image and get the base64 data
                const imageData = await canvasRef.current.exportImage("png");

                console.log("Exported image data:", imageData);

                if (!imageData) {
                    console.error("No image data returned from exportImage.");
                    return;
                }

                // Create a link element and set it up for download
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
        <div className={styles.drawingContainer}>
            <ReactSketchCanvas 
            ref={canvasRef} 
            width="100%"
            height="100%"
            canvasColor="#262626"
            strokeWidth={3}
            strokeColor="var(--broom)"
            allowOnlyPointerType="all" />
            <div className={styles.iconContainer}>
                <SVG src="icons/reset.svg" className={styles.icon} onClick={handleReset}/>
                <SVG src="icons/screenshot.svg" className={styles.icon} onClick={handleScreenshot}/>
            </div>
        </div>
    );
  }