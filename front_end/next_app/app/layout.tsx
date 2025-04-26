import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ReduxProvider } from '../store/provider';

export const metadata: Metadata = {
  title: "BlabIt✨",
  description: "Pages of linguistic enchantment, your speaking magic book unfolds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={'antialiased'}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
