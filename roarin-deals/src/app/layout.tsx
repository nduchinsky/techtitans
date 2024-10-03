import type { Metadata } from "next";
import Header from "./_components/Header/Header";

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
      <body style={{margin: 0, display: 'flex', flexDirection: 'column'}}>
        <Header />
        {children}
      </body>
    </html>
  );
}
