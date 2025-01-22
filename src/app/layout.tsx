import React from "react";

import type { Metadata } from "next";

import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "agency",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={` min-h-screen`}>
        {/* <ToastProvider> */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <StoreProvider>

            {children}
            <Toaster />
            </StoreProvider>
          </ThemeProvider>
        {/* </ToastProvider> */}
      </body>
    </html>
  );
}
