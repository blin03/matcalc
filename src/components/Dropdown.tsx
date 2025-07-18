import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from './Icon';

interface DropdownOption {
  id: string;
  name: string;
  icon?: string;
  prerelease?: boolean;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = "-- Select an option --",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.id === selectedValue);

  const filteredOptions = options
    .filter(option =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical sort

  const handleSelect = (optionId: string) => {
    onSelect(optionId);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onSelect('');
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative" ref={dropdownRef}>
      <h2 className="text-xl font-semibold mb-3 text-gray-300">{label}</h2>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="w-full h-14 py-2 px-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 flex items-center justify-between focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="flex items-center">
            {selectedOption?.icon && (
              <Icon src={selectedOption.icon} alt={selectedOption.name} className="w-10 h-10 mr-2 rounded-full" />
            )}
            {selectedOption ? selectedOption.name : <span className="text-gray-400">{placeholder}</span>}
          </span>
          <svg className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {selectedValue && ( // Only show clear button if an option is selected
          <button
            type="button"
            onClick={handleClear}
            className="w-14 h-14 flex-none rounded-xl bg-gray-700 text-gray-300 border border-gray-600 hover:bg-red-600 hover:text-white transition-colors duration-200 flex items-center justify-center"
            title="Clear selection"
            >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      {selectedOption?.prerelease && (
        <p className="text-red-500 text-sm mt-2">
          Warning: Selected option is pre-release and its materials are subject to change.
        </p>
      )}

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-gray-800 rounded-xl shadow-lg border border-gray-700 max-h-80 overflow-y-auto">
          <div className="p-3 border-b border-gray-700">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul role="listbox" className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  id={`option-${option.id}`}
                  role="option"
                  aria-selected={option.id === selectedValue}
                  className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors duration-150 ${
                    option.id === selectedValue ? 'bg-purple-700 text-white' : 'text-gray-200'
                  }`}
                  onClick={() => handleSelect(option.id)}
                >
                  {option.icon && (
                    <Icon src={option.icon} alt={option.name} className="w-10 h-10 mr-3 rounded-full" />
                  )}
                  {option.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400 text-center">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};