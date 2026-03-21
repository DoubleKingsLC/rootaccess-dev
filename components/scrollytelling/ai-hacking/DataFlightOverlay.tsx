"use client";

import React, { useMemo, useState, useEffect } from "react";
import { DATA_FLIGHTS } from "./aiHackingModel";

type DataFlightOverlayProps = {
  progress: number;
};

export function DataFlightOverlay({ progress }: DataFlightOverlayProps) {
  const [chatBoxPos, setChatBoxPos] = useState({ x: 70, y: 50 });
  const [scratchPadPos, setScratchPadPos] = useState({ x: 18, y: 85 });

  useEffect(() => {
    const chat = document.getElementById("hacking-chatbox");
    const scratch = document.getElementById("hacking-scratchpad");
    if (!chat || !scratch) return;

    const updatePositions = () => {
      const cRect = chat.getBoundingClientRect();
      const sRect = scratch.getBoundingClientRect();
      
      // Convert to screen percentage for consistent rendering
      setChatBoxPos({
        x: ((cRect.left + cRect.width / 2) / window.innerWidth) * 100,
        y: ((cRect.top + cRect.height / 2) / window.innerHeight) * 100,
      });
      setScratchPadPos({
        x: ((sRect.left + sRect.width / 2) / window.innerWidth) * 100,
        y: ((sRect.top + sRect.height / 2) / window.innerHeight) * 100,
      });
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  const activeFlights = useMemo(() => {
    return DATA_FLIGHTS.filter((f) => progress >= f.start && progress <= f.end);
  }, [progress]);

  if (activeFlights.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {activeFlights.map((flight) => {
        const t = (progress - flight.start) / (flight.end - flight.start);
        
        // Quad ease-in-out for more organic travel
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        
        const x = chatBoxPos.x + (scratchPadPos.x - chatBoxPos.x) * ease;
        const y = chatBoxPos.y + (scratchPadPos.y - chatBoxPos.y) * ease;
        
        // Scale and opacity effects
        const opacity = Math.sin(t * Math.PI); // Fades in and out
        const scale = 0.8 + Math.sin(t * Math.PI) * 0.4;

        return (
          <div
            key={flight.id}
            className="absolute flex items-center justify-center"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
            }}
          >
            {/* The "Packet" Glow */}
            <div className="relative">
                <div className="absolute inset-0 blur-md bg-red-500/60 rounded-full scale-150" />
                <div className="relative bg-red-400 px-2 py-0.5 rounded text-[8px] font-mono font-bold text-white shadow-[0_0_15px_rgba(239,68,68,0.8)] border border-white/20 whitespace-nowrap">
                    {flight.label}
                    <div className="absolute -inset-1 border border-red-500/40 rounded animate-pulse" />
                </div>
                
                {/* Trail Particles */}
                {[...Array(3)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute h-1 w-1 bg-red-400 rounded-full blur-[1px]"
                        style={{
                            left: -10 * (i + 1) * (1 - ease),
                            top: Math.sin(t * 10 + i) * 5,
                            opacity: (1 - t) * 0.5
                        }}
                    />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
