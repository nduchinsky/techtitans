import type { Metadata } from "next";
import Footer from "./_components/Footer/Footer";
import '../../globals.css';
import { AuthProvider } from "../../context/AuthContext";

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
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <main>
          <AuthProvider>
            {children}
          </AuthProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
