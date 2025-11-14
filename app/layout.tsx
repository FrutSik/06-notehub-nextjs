import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TanStackProvider from "./components/TanStackProvider/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteHub - Your Personal Notes App",
  description: "A simple and efficient application for managing personal notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <TanStackProvider>
          <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <div id="modal-root" />
        </TanStackProvider>
      </body>
    </html>
  );
}
