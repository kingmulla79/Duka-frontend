"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";
import { useColorScheme } from "@mui/material/styles";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { mode, setMode } = useColorScheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  if (!mode) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer"
          fill="black"
          size={25}
          onClick={() => {
            setTheme("dark");
            setMode("dark");
          }}
        />
      ) : (
        <BiSun
          className="cursor-pointer"
          size={25}
          onClick={() => {
            setTheme("light");
            setMode("light");
          }}
        />
      )}
    </div>
  );
};
