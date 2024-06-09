import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import NavBar from "@/components/NavBar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ['400', '700'], // You can specify the weights you want to use
  subsets: ['latin'], // Specify the subsets you need
  display: 'swap', // Optional: Specify the display strategy
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className} flex justify-center flex-col w-full h-screen`}>
         
          <main className="flex justify-center w-full h-full  ">
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
