'use client';

import React, { useEffect } from 'react';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Notification({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  duration = 5000 
}: NotificationProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return '#dcfce7';
      case 'error': return '#fee2e2';
      case 'warning': return '#fef3c7';
      case 'info': return '#dbeafe';
      default: return '#f3f4f6';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success': return '#15803d';
      case 'error': return '#dc2626';
      case 'warning': return '#d97706';
      case 'info': return '#1d4ed8';
      default: return '#374151';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getBackgroundColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        maxWidth: '400px',
        zIndex: 10000,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        animation: 'slideIn 0.3s ease-out',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>{getIcon()}</span>
      <p style={{
        margin: 0,
        color: getTextColor(),
        fontSize: '0.875rem',
        fontWeight: '500',
        flex: 1
      }}>
        {message}
      </p>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: getTextColor(),
          cursor: 'pointer',
          fontSize: '1.25rem',
          padding: '0.25rem',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ✕
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
} 