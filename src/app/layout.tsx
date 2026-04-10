import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FleetManager - Premium Fleet Management Services",
  description: "Experience premium fleet management services with professional drivers, reliable vehicles, and seamless booking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
