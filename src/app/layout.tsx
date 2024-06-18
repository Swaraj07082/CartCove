import type { Metadata } from "next";
import { Gothic_A1, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import CursorAnimation from "@/components/CursorAnimation";

const inter = Inter({ subsets: ["latin"] });

const gothic_A1 = Gothic_A1({
  weight:['300'],
  subsets:['latin']
})

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
      <body className={gothic_A1.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem ={true}
          disableTransitionOnChange
        >
          {children}
          {/* <CursorAnimation/> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
