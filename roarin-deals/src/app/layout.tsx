import type { Metadata } from "next";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";
import '../../globals.css';

export const metadata: Metadata = {
  title: "Roarin' Deals",
  description: "An online marketplace made by Mizzou students for Mizzou students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
