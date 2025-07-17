import React, { useRef, useState } from 'react';

interface MaterialInputFieldProps {
  currentInventory: number;
  totalRequired: number;
  onInventoryChange: (value: number) => void;
  formatNumber?: (num: number) => string;
}

// Helper function to format numbers with k/m abbreviations
const formatNumberWithAbbreviation = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

export const MaterialInputField: React.FC<MaterialInputFieldProps> = ({
  currentInventory,
  totalRequired,
  onInventoryChange,
  formatNumber = formatNumberWithAbbreviation
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Save and restore cursor position
  const saveCursorPosition = () => {
    if (!inputRef.current) return 0;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range.startOffset;
    }
    return 0;
  };

  const restoreCursorPosition = (position: number) => {
    if (!inputRef.current) return;
    const selection = window.getSelection();
    const range = document.createRange();
    
    const textLength = inputRef.current.textContent?.length || 0;
    const safePosition = Math.min(position, textLength);
    
    if (inputRef.current.firstChild) {
      range.setStart(inputRef.current.firstChild, safePosition);
      range.setEnd(inputRef.current.firstChild, safePosition);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <div className="inline-flex items-center justify-center mt-1 bg-gray-700 rounded-md py-1 px-2 border border-gray-600 material-input-container">
      <div
        ref={inputRef}
        contentEditable
        suppressContentEditableWarning={true}
        className="bg-transparent text-white text-center font-bold text-sm focus:outline-none inline-block min-w-[1ch] max-w-[10ch] select-all"
        style={{ padding: '2px 2px' }}
        onInput={(e) => {
          const cursorPosition = saveCursorPosition();
          const value = parseInt(e.currentTarget.textContent || '0', 10);
          onInventoryChange(isNaN(value) ? 0 : value);
          
          // Restore cursor position after the state update
          setTimeout(() => {
            restoreCursorPosition(cursorPosition);
          }, 0);
        }}
        onBlur={(e) => {
          // Clean up the content on blur to ensure it's a valid number
          const value = parseInt(e.currentTarget.textContent || '0', 10);
          const cleanValue = isNaN(value) ? 0 : value;
          e.currentTarget.textContent = cleanValue.toString();
          setIsEditing(false);
        }}
        onKeyDown={(e) => {
          if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onFocus={(e) => {
          setIsEditing(true);
          if (e.currentTarget.textContent !== '') {
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(e.currentTarget);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }}
      >
        {isEditing ? currentInventory : formatNumber(currentInventory)}
      </div>
      <span className="text-sm font-medium text-gray-300">/ {formatNumber(totalRequired)}</span>
    </div>
  );
};