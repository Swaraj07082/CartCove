import type { Metadata } from "next";
import { Gothic_A1, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

import Sessionprovider from "@/components/Provider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Providers } from "./redux/providers";
import { Poppins as FontSans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.variable}>
        <Providers>
          <Sessionprovider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem={true}
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
          </Sessionprovider>
        </Providers>
      </body>
    </html>
  );
}
