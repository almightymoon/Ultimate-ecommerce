"use client";

import React from 'react';
import { 
  ShoppingBagIcon, 
  SparklesIcon, 
  TruckIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

// Animated Circle Component (replacing 3D sphere for now)
function AnimatedCircle() {
  return (
    <div
      style={{
        width: '256px',
        height: '256px',
        background: 'linear-gradient(135deg, #4ade80, #16a34a)',
        borderRadius: '50%',
        opacity: 0.2,
        animation: 'rotate 8s linear infinite'
      }}
    />
  );
}

// Floating Elements Component
function FloatingElements() {
  const elements = [
    { icon: ShoppingBagIcon, delay: 0 },
    { icon: SparklesIcon, delay: 0.5 },
    { icon: TruckIcon, delay: 1 },
    { icon: ShieldCheckIcon, delay: 1.5 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {elements.map((element, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `float 4s ease-in-out infinite`,
            animationDelay: `${element.delay}s`
          }}
        >
          <element.icon style={{ width: '32px', height: '32px', color: '#22c55e' }} />
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero">
      {/* Background Pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at 25% 25%, rgba(34,197,94,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(34,197,94,0.1) 0%, transparent 50%)' 
        }} />
      </div>

      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatedCircle />
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Content */}
      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <SparklesIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Next Generation Shopping Experience
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          Discover the{' '}
          <span className="gradient-text">Future</span>
          <br />
          of Shopping
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Experience cutting-edge ecommerce with AI-powered recommendations, 
          immersive 3D product visualization, and seamless checkout.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <button className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
            Start Shopping
          </button>
          <button className="btn btn-outline" style={{ fontSize: '18px', padding: '16px 32px' }}>
            Learn More
          </button>
        </div>

        {/* Features */}
        <div className="hero-features">
          {[
            {
              icon: ShoppingBagIcon,
              title: 'Smart Shopping',
              description: 'AI-powered recommendations'
            },
            {
              icon: SparklesIcon,
              title: '3D Experience',
              description: 'Immersive product visualization'
            },
            {
              icon: TruckIcon,
              title: 'Fast Delivery',
              description: 'Same-day shipping available'
            },
            {
              icon: ShieldCheckIcon,
              title: 'Secure Checkout',
              description: 'Bank-level security'
            }
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon style={{ width: '32px', height: '32px' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#4b5563' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ 
          width: '24px', 
          height: '40px', 
          border: '2px solid #9ca3af', 
          borderRadius: '12px', 
          display: 'flex', 
          justifyContent: 'center',
          animation: 'float 2s ease-in-out infinite'
        }}>
          <div style={{ 
            width: '4px', 
            height: '12px', 
            backgroundColor: '#9ca3af', 
            borderRadius: '2px', 
            marginTop: '8px',
            animation: 'float 2s ease-in-out infinite'
          }} />
        </div>
      </div>
    </section>
  );
} 