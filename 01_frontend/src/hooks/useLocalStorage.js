import { useEffect, useState } from 'react'

// Generic localStorage-backed state. Lazy reads + parses JSON once, writes on change.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.error(`Failed to read localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Failed to write localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue]
}
