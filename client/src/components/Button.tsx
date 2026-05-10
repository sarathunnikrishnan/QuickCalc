import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'accent' | 'operator';
  className?: string;
  isWide?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'default', 
  className = '',
  isWide = false
}) => {
  let variantClass = 'glass-button text-foreground text-xl font-medium';
  
  if (variant === 'primary') {
    variantClass = 'glass-button-primary text-2xl font-bold';
  } else if (variant === 'accent') {
    variantClass = 'glass-button-accent text-xl font-semibold';
  } else if (variant === 'operator') {
    variantClass = 'glass-button text-primary text-2xl font-semibold bg-primary/10';
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${variantClass} 
        ${isWide ? 'col-span-2 aspect-[2/1]' : 'aspect-square'} 
        rounded-2xl flex items-center justify-center
        ${className}
      `}
    >
      {label}
    </motion.button>
  );
};

export default Button;
