import React from 'react';
import Button from './Button';
import { Delete } from 'lucide-react';

interface KeypadProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onCalculate: () => void;
}

const Keypad: React.FC<KeypadProps> = ({
  onInput,
  onClear,
  onDelete,
  onCalculate
}) => {
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      {/* Top Row */}
      <Button label="C" onClick={onClear} variant="accent" />
      <Button label="%" onClick={() => onInput('%')} variant="accent" />
      <Button label={<Delete size={24} />} onClick={onDelete} variant="accent" />
      <Button label="÷" onClick={() => onInput('÷')} variant="operator" />

      {/* Numbers */}
      <Button label="7" onClick={() => onInput('7')} />
      <Button label="8" onClick={() => onInput('8')} />
      <Button label="9" onClick={() => onInput('9')} />
      <Button label="×" onClick={() => onInput('×')} variant="operator" />

      <Button label="4" onClick={() => onInput('4')} />
      <Button label="5" onClick={() => onInput('5')} />
      <Button label="6" onClick={() => onInput('6')} />
      <Button label="−" onClick={() => onInput('−')} variant="operator" />

      <Button label="1" onClick={() => onInput('1')} />
      <Button label="2" onClick={() => onInput('2')} />
      <Button label="3" onClick={() => onInput('3')} />
      <Button label="+" onClick={() => onInput('+')} variant="operator" />

      {/* Bottom Row */}
      <Button label="0" onClick={() => onInput('0')} isWide />
      <Button label="." onClick={() => onInput('.')} />
      <Button label="=" onClick={onCalculate} variant="primary" />
    </div>
  );
};

export default Keypad;
