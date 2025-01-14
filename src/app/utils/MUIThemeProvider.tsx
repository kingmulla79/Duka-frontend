/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "next-themes";

interface ProviderProps {
  children: ReactNode;
}

export function CustomMUIThemeProvider({ children }: ProviderProps) {
  const { theme, setTheme } = useTheme();
  const MUItheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            // Outlined
            "& .MuiOutlinedInput-root": {
              color: `${theme === "dark" ? "#fff" : "#000"}`,
              fontFamily: "Poppins",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme === "dark" ? "#fff" : "#000"}`,
                borderWidth: "2px",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                  borderWidth: "3px",
                },
              },
              "&:hover:not(.Mui-focused)": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                },
              },
            },
            "& .MuiInputLabel-outlined": {
              color: `${theme === "dark" ? "#fff" : "#000"}`,
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "Poppins",
              "&.Mui-focused": {
                color: `${theme === "dark" ? "#fff" : "#000"}`,
              },
            },
            // Filled
            "& .MuiFilledInput-root": {
              color: `${theme === "dark" ? "#fff" : "#000"}`,
              fontFamily: "Poppins",
              fontWeight: "bold",
              backgroundColor: `${theme === "dark" ? "#475569" : "#e7e7e7"}`,

              "&:after": {
                borderColor: "#1976d2",
                backgroundColor: `${theme === "dark" ? "#475569" : "#e7e7e7"}`,
              },
              "&:hover:not(.Mui-focused)": {
                "&:before": {
                  borderColor: `${theme === "dark" ? "#b8c1ce" : "#000"}`,
                },
                "&:after": {
                  borderColor: `${theme === "dark" ? "#b8c1ce" : "#000"}`,
                },
              },
              "&.Mui-focused": {
                backgroundColor: `${theme === "dark" ? "#475569" : "#e7e7e7"}`,
              },
            },

            "& .MuiInputLabel-filled": {
              color: `${theme === "dark" ? "#fff" : "#000"}`,
              fontFamily: "Poppins",
              fontWeight: "bold",
              "&.Mui-focused": {
                color: `${theme === "dark" ? "#fff" : "#000"}`,
              },
            },
            // Standard
            "& .MuiInput-root": {
              color: `${theme === "dark" ? "#fff" : "#000"}`,
              fontFamily: "Poppins",
              fontWeight: "bold",
              "&:before": {
                borderColor: `${theme === "dark" ? "#fff" : "#000"}`,
              },
              "&:after": {
                borderColor: "#1976d2",
              },
              ":hover:not(.Mui-focused)": {
                "&:before": {
                  borderColor: `${theme === "dark" ? "#e7e7e7" : "#000"}`,
                },
              },
            },
            "& .MuiInputLabel-standard": {
              color: `${theme === "dark" ? "#fff" : "#000"}`,
              fontWeight: "bold",
              fontFamily: "Poppins",
              "&.Mui-focused": {
                color: `${theme === "dark" ? "#fff" : "#000"}`,
              },
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            "& .MuiTypography-root": {
              color: `${theme === "dark" ? "#fff" : "#000"}`,
              fontWeight: "bold",
              fontFamily: "Poppins",
            },
          },
        },
      },
      MuiRating: {
        styleOverrides: {
          root: {
            fill: `${theme === "dark" ? "#fff" : "#000"}`,
            textDecorationColor: `${theme === "dark" ? "#fff" : "#000"}`,
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            color: `${theme === "dark" ? "#fff" : "#000"}`,
            fontWeight: "bold",
            fontFamily: "Poppins",
            backgroundColor: `${theme === "dark" ? "#475569" : "#e7e7e7"}`,
            ":hover:not(.Mui-focused)": {
              "&:before": {
                borderColor: `${theme === "dark" ? "#e7e7e7" : "#000"}`,
              },
              "&:after": {
                borderColor: `${theme === "dark" ? "#e7e7e7" : "#000"}`,
              },
              "&.Mui-focused": {
                backgroundColor: `${theme === "dark" ? "#475569" : "#e7e7e7"}`,
              },
            },
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: `${theme === "dark" ? "#fff" : "#000"}`,
            fontWeight: "bold",
            fontFamily: "Poppins",
            backgroundColor: `${theme === "dark" ? "#475569" : "#e7e7e7"}`,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: `${theme === "dark" ? "#fff" : "#000"}`,
            fontWeight: "bold",
            fontFamily: "Poppins",
            // backgroundColor: `${theme === "dark" ? "#475569" : "#e7e7e7"}`,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: `${theme === "dark" ? "#fff" : "#000"}`,
            fontWeight: "bold",
            fontFamily: "Poppins",
            backgroundColor: `${theme === "dark" ? "#475569" : "#e7e7e7"}`,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            "& .MuiMenuItem-root": {
              color: `${theme === "dark" ? "#fff" : "#000"}`,
              fontWeight: "bold",
              fontFamily: "Poppins",
              backgroundColor: `${theme === "dark" ? "#475569" : "#e7e7e7"}`,
            },
          },
        },
      },
    },
  });
  return <ThemeProvider theme={MUItheme}>{children}</ThemeProvider>;
}
