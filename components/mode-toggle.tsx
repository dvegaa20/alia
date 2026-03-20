"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon-lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[1.2rem] w-[1.2rem]"
      >
        <path
          d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM7.5 1.5C10.8137 1.5 13.5 4.18629 13.5 7.5C13.5 10.8137 10.8137 13.5 7.5 13.5V1.5Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
