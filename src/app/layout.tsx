import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Curta - Media Kit",
  description:
    "Conectamos marcas a influenciadores e engajamos audiências de uma forma que só quem vive esse dia a dia e domina as plataformas consegue fazer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={montserrat.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
