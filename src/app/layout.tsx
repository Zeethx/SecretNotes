import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import  Navbar  from "@/components/Navbar"
import AuthProvider from "@/context/AuthProvider";
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedbacks.me",
  description: "Send messages privately",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={inter.className}>
        <main>
          {children}
        </main>
        <Toaster />
      </body>
      </AuthProvider>
    </html>
  );
}
