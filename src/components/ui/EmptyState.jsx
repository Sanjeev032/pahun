import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './Button';

export const EmptyState = ({
  title = 'Nothing to see here yet',
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'w-full border border-dashed border-gray-200 rounded-3xl bg-luxury-ivory/40 px-8 py-16 flex flex-col items-center justify-center text-center gap-4',
        className,
      )}
    >
      <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-semibold">
        {title}
      </p>
      {description && (
        <p className="max-w-md text-xs md:text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="outline" className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

