import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malete — Find your KWASU accommodation",
  description:
    "Find verified accommodation around Kwara State University before resumption. Join the waitlist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=switzer@400,500,600,700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
