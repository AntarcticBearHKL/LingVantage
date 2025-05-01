import type { Metadata } from "next";
import "./globals.css";

import { ReduxProvider } from '../component/store/provider';

export const metadata: Metadata = {
  title: "BlabIt✨",
  description: "Pages of linguistic enchantment, your speaking magic book unfolds",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
