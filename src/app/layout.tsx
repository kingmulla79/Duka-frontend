"use client";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { NextThemeProvider } from "./utils/theme-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "../../redux/features/auth/authAPI";
import Loader from "./components/Loader/Loader";
// import { CustomMUIThemeProvider } from "./utils/MUIThemeProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <NextThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <ThemeProvider theme={theme} disableTransitionOnChange>
                <CssBaseline />
                <Custom>{children}</Custom>
                <Toaster position="top-center" reverseOrder={false} />
              </ThemeProvider>
            </NextThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
