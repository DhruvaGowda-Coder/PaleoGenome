import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#02070d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PaleoGenome — Reviving the Lost Code of Life | Ancient DNA & Deep Learning",
  description:
    "Explore Earth's lost biodiversity through ancient DNA reconstruction, evolutionary genetics, and deep learning neural deconvolution.",
  keywords: [
    "ancient DNA",
    "de-extinction",
    "deep learning",
    "mammoth",
    "thylacine",
    "paleogenomics",
    "wildlife documentary",
    "evolutionary genetics"
  ],
  authors: [{ name: "PaleoGenome Research Consortium" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${cinzel.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#02070d] text-[#eef4f8] selection:bg-[#2563eb] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}

