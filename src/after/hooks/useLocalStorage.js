import { useEffect, useState } from 'react'

// Works like useState, but the value is saved in localStorage under `key`.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore write errors (private mode, storage full)
    }
  }, [key, value])

  return [value, setValue]
}
