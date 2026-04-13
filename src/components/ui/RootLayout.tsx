import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HireHub - AI-Powered Job Board",
  description: "Find Your Dream Job",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
          {/* Global Navbar */}
          <Navbar />
          
          {/* Page Content */}
          <div className="grow">
            {children}
          </div>

          <Footer />
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
