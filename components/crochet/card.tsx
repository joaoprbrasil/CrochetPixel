import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

/**
 * Reusable card component for sections
 */
export function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn('rounded-2xl bg-white p-8 shadow-lg', className)}>
      {title && (
        <h2 className="mb-5 text-2xl font-bold text-pink-700">{title}</h2>
      )}
      {children}
    </div>
  );
}
