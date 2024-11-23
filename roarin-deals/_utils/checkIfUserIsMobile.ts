"use client";

import { useState, useEffect } from 'react';

const useViewport = (breakpoint: number = 400): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkViewport = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Initial check
        checkViewport();

        // Add event listener for resize
        window.addEventListener('resize', checkViewport);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', checkViewport);
        };
    }, [breakpoint]);

    return isMobile;
};

export default useViewport;
