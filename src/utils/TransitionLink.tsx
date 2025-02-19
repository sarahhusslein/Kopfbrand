"use client"
import Link, { LinkProps } from "next/link";
import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
    children: ReactNode;
    className?: string;
    href: string;
}

function sleep(ms: number) : Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
    children,
    href,
    className,
    ...props
}: TransitionLinkProps) => {
    const router = useRouter();

    const handleTransition = async(
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();

        const pageExit = document.querySelector("#page-exit");
        const pageEnter = document.querySelector("#page-enter");

        if (pageExit && pageEnter) {
            pageExit.classList.add("page-transition-exit");
            pageEnter.classList.add("page-transition-enter");
        }

        await sleep(1000); // Warte auf Animation

        router.push(href);

        await sleep(100); // Warte kurz nach dem Wechsel

        if (pageExit && pageEnter) {
            pageExit.classList.remove("page-transition-exit");
            pageEnter.classList.remove("page-transition-enter");
        }
    
        

        // const body = document.querySelector("body");

        // body?.classList.add("page-transition");
        // await sleep(500);

        // router.push(href);

        // await sleep(500);

        // body?.classList.remove("page-transition");
    }

    return (
        <Link 
            onClick={handleTransition}
            href={href} 
            className={className} 
            {...props}
        >
            {children}
            </Link>
        )
}