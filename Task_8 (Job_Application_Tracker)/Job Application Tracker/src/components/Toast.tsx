import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    info: <AlertCircle className="w-5 h-5 text-blue-400" />,
  };

  const borders = {
    success: 'border-green-500/50',
    error: 'border-red-500/50',
    info: 'border-blue-500/50',
  };

  return (
    <div className={`fixed top-4 right-4 z-[100] glass-card flex items-center gap-3 px-4 py-3 min-w-[300px] border-l-4 ${borders[type]} animate-in slide-in-from-right duration-300`}>
      <div className="shrink-0">{icons[type]}</div>
      <p className="flex-1 text-sm font-medium text-white/90">{message}</p>
      <button 
        onClick={onClose}
        className="shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4 text-white/60" />
      </button>
      <div className="absolute bottom-0 left-0 h-1 bg-white/20 animate-progress origin-left" style={{ animationDuration: `${duration}ms` }} />
    </div>
  );
}
