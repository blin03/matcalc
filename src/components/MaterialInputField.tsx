import React, { useRef, useState, useEffect } from 'react';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dynamicWidth, setDynamicWidth] = useState(1); 

  // Effect to update the input value and calculate dynamic width
  useEffect(() => {
    if (inputRef.current) {
      const valueToMeasure = isEditing ? currentInventory.toString() : formatNumber(currentInventory);
      inputRef.current.value = valueToMeasure;
      // Calculate dynamic width based on the current content length
      setDynamicWidth(Math.max(valueToMeasure.length + 0.5, 1));
    }
  }, [currentInventory, isEditing, formatNumber]);

  return (
    <div className="inline-flex items-center justify-center mt-1 bg-gray-700 rounded-md py-1 px-2 border border-gray-600 material-input-container">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="bg-transparent text-white text-center font-bold text-sm focus:outline-none inline-block select-all"
        style={{
          padding: '2px 2px',
          // Dynamically set both min-width and max-width to match dynamicWidth
          minWidth: `${dynamicWidth}ch`,
          maxWidth: `${dynamicWidth}ch`, 
          transition: 'min-width 0.1s ease-out, max-width 0.1s ease-out'
        }}
        onInput={(e) => {
          const numericValue = e.currentTarget.value.replace(/[^0-9]/g, '');
          e.currentTarget.value = numericValue;

          const value = parseInt(numericValue || '0', 10);
          onInventoryChange(isNaN(value) ? 0 : value);
          
          // Update dynamic width as user types to match new content length
          setDynamicWidth(Math.max(numericValue.length + 0.5, 1));
        }}
        onBlur={(e) => {
          const value = parseInt(e.currentTarget.value || '0', 10);
          const cleanValue = isNaN(value) ? 0 : value;
          e.currentTarget.value = cleanValue.toString();
          onInventoryChange(cleanValue);
          setIsEditing(false);
        }}
        onKeyDown={(e) => {
          if (!/[0-9]/.test(e.key) && 
              !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) &&
              !e.metaKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();
          }
        }}
        onFocus={(e) => {
          setIsEditing(true);
          e.currentTarget.select();
        }}
        value={isEditing ? currentInventory.toString() : formatNumber(currentInventory)} 
      />
      <span className="text-sm font-medium text-gray-300">/ {formatNumber(totalRequired)}</span>
    </div>
  );
};