import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// format price to thai baht
export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(amount);
};