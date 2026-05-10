import React, { useState, useEffect, useCallback } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { evaluateExpression } from '../utils/calculatorLogic';
import axios from 'axios';

interface CalculatorProps {
  onCalculationSaved?: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onCalculationSaved }) => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const handleInput = useCallback((val: string) => {
    const operators = ['+', '−', '×', '÷', '%'];

    if (isCalculated && !operators.includes(val)) {
      setExpression(val);
      setResult('');
      setIsCalculated(false);
      return;
    }

    if (isCalculated) {
      setExpression(result + val);
      setResult('');
      setIsCalculated(false);
      return;
    }

    // Prevent consecutive operators
    if (operators.includes(val)) {
      if (!expression) {
        // Can only start with a minus sign
        if (val !== '−') return;
      } else {
        const lastChar = expression.slice(-1);
        if (operators.includes(lastChar)) {
          // Replace the last operator with the new one
          setExpression((prev) => prev.slice(0, -1) + val);
          return;
        }
      }
    }

    setExpression((prev) => prev + val);
  }, [isCalculated, result, expression]);

  const handleClear = useCallback(() => {
    setExpression('');
    setResult('');
    setIsCalculated(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (isCalculated) {
      setExpression('');
      setResult('');
      setIsCalculated(false);
      return;
    }
    setExpression((prev) => prev.slice(0, -1));
  }, [isCalculated]);

  const handleCalculate = useCallback(async () => {
    if (!expression) return;
    
    const evalResult = evaluateExpression(expression);
    setResult(evalResult);
    setIsCalculated(true);

    if (evalResult !== 'Error') {
      try {
        await axios.post('http://localhost:5000/api/history', {
          expression,
          result: evalResult
        });
        if (onCalculationSaved) onCalculationSaved();
      } catch (error) {
        console.error('Failed to save calculation', error);
      }
    }
  }, [expression, onCalculationSaved]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (/[0-9.]/.test(key)) {
        handleInput(key);
      } else if (key === '+' || key === '-') {
        handleInput(key === '-' ? '−' : '+');
      } else if (key === '*' || key === 'x') {
        handleInput('×');
      } else if (key === '/') {
        handleInput('÷');
      } else if (key === '%') {
        handleInput('%');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (key === 'Backspace') {
        handleDelete();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, handleCalculate, handleDelete, handleClear]);

  return (
    <div className="glass p-6 sm:p-8 rounded-[2.5rem] w-full max-w-sm mx-auto relative overflow-hidden">
      {/* Glow effect behind calculator */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-3xl pointer-events-none -z-10" />
      
      <Display expression={expression} result={result} />
      <Keypad 
        onInput={handleInput}
        onClear={handleClear}
        onDelete={handleDelete}
        onCalculate={handleCalculate}
      />
    </div>
  );
};

export default Calculator;
