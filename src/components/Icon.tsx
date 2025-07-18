import React from 'react';

interface IconProps {
  name?: string; // Deprecated
  src?: string;   // New usage (image paths)
  alt?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, src, alt, className }) => {
  if (src) {
    // Fallback image if target cannot be loaded
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = "assets/icons/other/caterm.webp";
    };

    return (
      <img
        src={src}
        alt={alt || 'icon'}
        className={`inline-block ${className}`}
        onError={handleError}
      />
    );
  } else if (name) {
    // Fallback to text/emoji icon if no src
    return <span className={className}>{name}</span>;
  }
  return null;
};