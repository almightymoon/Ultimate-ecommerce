'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        {/* Main Spinner */}
        <motion.div
          className="w-24 h-24 border-4 border-purple-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-r-pink-600 rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Pulsing Center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg" />
        </motion.div>

        {/* Orbiting Dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              marginTop: '-6px',
              marginLeft: '-6px',
            }}
            animate={{
              x: [0, Math.cos((i * 60) * Math.PI / 180) * 40],
              y: [0, Math.sin((i * 60) * Math.PI / 180) * 40],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}



        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-xl"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
} 