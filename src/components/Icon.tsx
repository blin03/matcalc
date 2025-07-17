import React from 'react';

interface IconProps {
  name?: string; // Deprecated
  src?: string;   // New usage (image paths)
  alt?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, src, alt, className }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || 'icon'}
        className={`inline-block ${className}`}
      />
    );
  } else if (name) {
    // Fallback to text/emoji icon if no src
    return <span className={className}>{name}</span>;
  }
  return null;
};