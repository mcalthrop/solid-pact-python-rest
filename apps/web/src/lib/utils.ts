import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes; later wins on conflicts. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
