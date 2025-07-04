import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JourneyFlux - Trasforma ogni viaggio in un'avventura",
  description: "L'app che gamifica l'esperienza di viaggio attraverso sfide geolocalizzate, badge collezionabili e contenuti creati dalla community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}
