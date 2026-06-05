import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gestadinamia | Investigación en salud materna",
  description:
    "Grupo de investigación en salud materna y fetal, con foco en preeclampsia y trastornos hipertensivos del embarazo. Ciencia colaborativa aplicada a decisiones clínicas.",
  keywords: ["preeclampsia", "Gestadinamia", "investigación", "salud materna", "THAE"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
