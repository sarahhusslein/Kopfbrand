import { useEffect, useState } from 'react';

export default function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const updateMousePosition = (event) => {
        const container = event.currentTarget;
        const rect = container.getBoundingClientRect();
        
        // Use pageX/pageY instead of clientX/clientY to account for scroll
        const x = event.pageX - rect.left - (typeof window !== 'undefined' ? window.scrollX : 0);
        const y = event.pageY - rect.top - (typeof window !== 'undefined' ? window.scrollY : 0);

        setMousePosition({ x, y });
    }

    return { mousePosition, updateMousePosition };
}