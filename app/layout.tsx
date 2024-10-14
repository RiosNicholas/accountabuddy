import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Image from "next/image";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Accountabuddy",
  description: "Connect and form accountability partners or groups at Rutgers University for shared goals and productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-background">
            <Header />
            <main className="z-10">
              {children}
            </main>
            <footer className="flex gap-6 p-5 flex-wrap items-center justify-center text-sm font-mono z-10">
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://sasn.rutgers.edu/mathematics-and-computer-science/ba-computer-science"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="https://nextjs.org/icons/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                />
                Made at Rutgers University–Newark
              </a>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://github.com/RiosNicholas/accountabuddy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="https://nextjs.org/icons/github.svg"
                  alt="GitHub icon"
                  width={16}
                  height={16}
                />
                View on GitHub
              </a>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
