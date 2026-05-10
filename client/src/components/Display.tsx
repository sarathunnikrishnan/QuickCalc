import React from 'react';
import { motion } from 'framer-motion';

interface DisplayProps {
  expression: string;
  result: string;
}

const Display: React.FC<DisplayProps> = ({ expression, result }) => {
  return (
    <div className="w-full flex flex-col items-end justify-end p-6 mb-4 rounded-3xl bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50 h-32 overflow-hidden relative">
      {/* Expression Area */}
      <motion.div 
        key={`expr-${expression}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-zinc-500 dark:text-zinc-400 text-lg mb-1 min-h-[28px] max-w-full overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        {expression || '0'}
      </motion.div>
      
      {/* Result Area */}
      <motion.div 
        key={`res-${result}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 truncate max-w-full ${
          result === 'Error' ? 'text-red-500' : ''
        }`}
      >
        {result || ''}
      </motion.div>
    </div>
  );
};

export default Display;
