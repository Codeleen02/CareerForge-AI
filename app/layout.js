import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import SessionWrapper from "@/Components/SessionWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CareerForge AI",
  description: "Easy internship hunting and opening",
}; 

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <SessionWrapper>
        <Navbar/>
        <div className="flex-1 bg-[#D4FAD7] ">
          {children}
          </div>
          </SessionWrapper>
      </body>
    </html>
  );
}
