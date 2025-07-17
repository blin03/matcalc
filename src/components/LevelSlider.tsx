import React from 'react';

interface LevelSliderProps {
  label: string;
  currentLevel: number;
  targetLevel: number;
  maxLevel?: number;
  minLevel?: number;
  allowedValues?: number[];
  onCurrentChange: (level: number) => void;
  onTargetChange: (level: number) => void;
  className?: string;
}

export const LevelSlider: React.FC<LevelSliderProps> = ({
  label,
  currentLevel,
  targetLevel,
  maxLevel,
  minLevel,
  allowedValues,
  onCurrentChange,
  onTargetChange,
  className,
}) => {
  const isDiscrete = Array.isArray(allowedValues) && allowedValues.length > 0;

  const handleCurrentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    let newCurrentLevel = isDiscrete && allowedValues ? allowedValues[value] : value;

    // If the new current level is greater than the target level,
    // set both current and target to the new current level.
    if (newCurrentLevel > targetLevel) {
      onCurrentChange(newCurrentLevel);
      onTargetChange(newCurrentLevel);
    } else {
      onCurrentChange(newCurrentLevel);
    }
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    let newTargetLevel = isDiscrete && allowedValues ? allowedValues[value] : value;

    // If the new target level is less than the current level,
    // set both current and target to the new target level.
    if (newTargetLevel < currentLevel) {
      onTargetChange(newTargetLevel);
      onCurrentChange(newTargetLevel);
    } else {
      onTargetChange(newTargetLevel);
    }
  };

  // Determine the actual index for discrete values for slider position
  const currentSliderValue = isDiscrete && allowedValues
    ? allowedValues.indexOf(currentLevel)
    : currentLevel;

  const targetSliderValue = isDiscrete && allowedValues
    ? allowedValues.indexOf(targetLevel)
    : targetLevel;

  // Slider min/max should always be based on the allowed values/full range
  const sliderMin = isDiscrete ? 0 : (minLevel || 0);
  const sliderMax = isDiscrete ? (allowedValues!.length - 1) : (maxLevel || 100);

  const currentPercentage = ((currentSliderValue - sliderMin) / (sliderMax - sliderMin)) * 100;
  const targetPercentage = ((targetSliderValue - sliderMin) / (sliderMax - sliderMin)) * 100;
  
  return (
    <div className={`bg-gray-900 rounded-lg p-2 flex flex-col space-y-4 text-sm shadow-xl ${className || ''}`}>
      <h3 className={`font-semibold text-gray-200 text-center text-base`}>
        {label}
      </h3>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-400 text-center">
          Current: <span className="font-bold text-white">{currentLevel}</span>
        </label>
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          value={currentSliderValue}
          onChange={handleCurrentChange}
          className={`
            w-full h-3 rounded-full cursor-pointer
            appearance-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-purple-400
            [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(255,255,255,0.15)]
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-purple-400
            [&::-moz-range-thumb]:shadow-[0_0_0_4px_rgba(255,255,255,0.15)]
            [&::-moz-range-thumb]:hover:scale-125
          `}
          style={{
            background: `linear-gradient(to right, #a78bfa 0%, #a78bfa ${currentPercentage}%, #374151 ${currentPercentage}%, #374151 100%)`
          }}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-400 text-center">
          Target: <span className="font-bold text-white">{targetLevel}</span>
        </label>
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          value={targetSliderValue}
          onChange={handleTargetChange}
          className={`
            w-full h-3 rounded-full cursor-pointer
            appearance-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-purple-400
            [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(255,255,255,0.15)]
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-purple-400
            [&::-moz-range-thumb]:shadow-[0_0_0_4px_rgba(255,255,255,0.15)]
            [&::-moz-range-thumb]:hover:scale-125
          `}
          style={{
            background: `linear-gradient(to right, #a78bfa 0%, #a78bfa ${targetPercentage}%, #374151 ${targetPercentage}%, #374151 100%)`
          }}
        />
      </div>
    </div>
  );
};