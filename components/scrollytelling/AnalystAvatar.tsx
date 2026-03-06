"use client";

import React from "react";
import { motion } from "framer-motion";

type AnalystAvatarProps = {
  isAlerted?: boolean;
};

export const AnalystAvatar: React.FC<AnalystAvatarProps> = ({ isAlerted }) => {
  return (
    <motion.div
      animate={
        isAlerted
          ? {
              boxShadow: "0 0 20px rgba(248,113,113,0.8)",
              backgroundColor: "rgba(15,23,42,1)"
            }
          : {
              boxShadow: "0 0 8px rgba(148,163,184,0.4)",
              backgroundColor: "rgba(15,23,42,0.9)"
            }
      }
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-500/70"
    >
      <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
    </motion.div>
  );
};

