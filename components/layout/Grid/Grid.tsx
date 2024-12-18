import React from 'react';

import { cn } from '@/lib/utils';

interface GridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: number;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, cols = { mobile: 1, tablet: 2, desktop: 3 }, gap = 4, className }) => {
  return (
    <div
      className={cn(
        `grid`,
        `grid-cols-${cols.mobile}`,
        `md:grid-cols-${cols.tablet}`,
        `lg:grid-cols-${cols.desktop}`,
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
