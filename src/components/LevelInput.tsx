import React from 'react';

interface LevelInputProps {
  label: string;
  currentLevel: number;
  targetLevel: number;
  maxLevel: number;
  minLevel: number;
  onCurrentChange: (level: number) => void;
  onTargetChange: (level: number) => void;
}

export const LevelInput: React.FC<LevelInputProps> = ({ 
  label, 
  currentLevel, 
  targetLevel, 
  maxLevel, 
  minLevel,
  onCurrentChange, 
  onTargetChange 
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-700 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white">{label} Levels</h3>
      <div className="flex items-center gap-4">
        <label htmlFor={`${label}-current`} className="text-gray-300">Current Level:</label>
        <input
          id={`${label}-current`}
          type="number"
          min={minLevel}
          max={maxLevel}
          value={currentLevel}
          onChange={(e) => onCurrentChange(Math.max(minLevel, Math.min(parseInt(e.target.value) || minLevel, maxLevel)))}
          className="w-24 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor={`${label}-target`} className="text-gray-300">Target Level:</label>
        <input
          id={`${label}-target`}
          type="number"
          min={currentLevel + 1}
          max={maxLevel}
          value={targetLevel}
          onChange={(e) => onTargetChange(Math.max(currentLevel + 1, Math.min(parseInt(e.target.value) || currentLevel + 1, maxLevel)))}
          className="w-24 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};