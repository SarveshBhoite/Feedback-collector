"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
  const { theme, setTheme } = React.useContext(
    React.createContext<{
      theme: string | undefined
      setTheme: (theme: string) => void
    }>({
      theme: undefined,
      setTheme: () => null,
    }),
  )

  // Use next-themes directly
  const { theme: nextTheme, setTheme: nextSetTheme } = React.useContext(
    // @ts-ignore - next-themes doesn't export its context type
    React.createContext({ theme: undefined, setTheme: (t: string) => {} }),
  )

  // Use the actual next-themes values if available, otherwise fall back to the context values
  return {
    theme: nextTheme || theme,
    setTheme: nextSetTheme || setTheme,
  }
}
