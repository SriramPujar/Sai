import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center transition-all relative py-2 px-4",
      active ? "text-primary" : "text-on-surface-variant/60 hover:text-primary/70"
    )}
  >
    {active && (
      <motion.div
        layoutId="nav-glow"
        className="absolute inset-0 bg-primary-fixed/20 blur-xl rounded-full -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-medium mt-1 font-body">{label}</span>
  </button>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className, onClick }) => (
  <div onClick={onClick} className={cn("bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_32px_rgba(62,39,35,0.04)]", className)}>
    {children}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; 
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, variant = 'primary', className, onClick, disabled }) => {
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90",
    secondary: "bg-surface-container-high text-primary hover:bg-primary-fixed/30",
    outline: "border border-outline-variant/30 text-primary hover:bg-surface-container-low",
    ghost: "text-primary hover:bg-primary-fixed/10"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-full font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export const Toast: React.FC<{ message: string; visible: boolean; onClose: () => void }> = ({ message, visible, onClose }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[100] bg-on-background text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-[200px] justify-center"
      >
        <span className="text-sm font-medium">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);
