"use client";

import { useState, useEffect } from "react";

export const useIsMobile = (threshold: number = 768) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkIsMobile = () => {
            if (typeof window === "undefined") {
                return;
            }
            setIsMobile(window.innerWidth < threshold);
        };

        // Initial check
        checkIsMobile();

        if (typeof window === "undefined") {
            return;
        }

        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, [threshold]);

    return isMobile;
};
