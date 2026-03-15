import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gestadinamia | Investigación en Salud Materna",
  description:
    "Nuestro compromiso es avanzar en la salud materna a través de la investigación y el conocimiento. Grupo de investigación enfocado en preeclampsia.",
  keywords: ["preeclampsia", "Gestadinamia", "investigación", "salud materna"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${lora.variable} antialiased`}>{children}</body>
    </html>
  );
}
