import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";

import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";

import getSongByUserID from "@/actions/getSongByUserID";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices"

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to Music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongByUserID();
  const products = await getActiveProductsWithPrices();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
