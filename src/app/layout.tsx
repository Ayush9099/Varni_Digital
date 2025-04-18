import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import AlertElement from "~/app/_components/Elements/AlertElement";
import { StoreProvider } from "../providers/StoreProvider"

export const metadata: Metadata = {
  title: "Switch Craft",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
    <body className="app-grey">
        <StoreProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <AlertElement />
        </StoreProvider>
      </body>
    </html>
  );
}
