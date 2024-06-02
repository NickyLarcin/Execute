import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const colorsHr = ["bg-blue-500", "bg-blue-300", "bg-blue-500", "bg-green-500"]

export function getTailwindRedColor(value: number) {
  // Ensure the value is within the range 0 to 100
  value = Math.max(0, Math.min(100, value));

  // Calculate the Tailwind red class index (1 to 9)
  const index = Math.round((value / 100) * 8) + 1; // Scale 0-100 to 1-9
  const tailwindClass = `bg-red-${index}00`;

  return tailwindClass;
}

