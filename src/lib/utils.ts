import { clsx, type ClassValue } from "clsx"
import { getWebRequest } from '@tanstack/react-start/server'
import { getAuth } from '@clerk/tanstack-react-start/server'
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getUser = async () => {
  const { userId } = await getAuth(getWebRequest()!)

  return { userId }
}