import type { Metadata } from "next";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Metrics One",
  description: "Datas about F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head></head>
      <body className="min-h-screen relative before:content-[' '] before:block before:h-12 after:content-[' '] after:block after:h-8">
        <Navbar />
        <main>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
