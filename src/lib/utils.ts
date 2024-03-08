import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateRoomId = () => {
  return Math.random().toString(36).substring(7);
}

export const getUser = (socketId: string, users?: User[]) => {
  if (!users) return null
  return users.find((u) => u.socketId === socketId)
}