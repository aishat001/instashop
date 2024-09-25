import type { Metadata } from "next";
import "../styles/globals.css";
import { DM_Sans } from 'next/font/google'

const dm_Sans = DM_Sans({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Instashop - Your One-Stop Shop",
  description: "Instashop is a simple and efficient progressive web application built with Next.js, offering a seamless shopping experience.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "pwa", "ecommerce", "shopping", "instashop"],
  // themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm_Sans.className}  antialiased bg-white   h-screen overflow-y-auto`}
      >
        {/* <div className="max-w-[360px] shadow mx-auto"> */}
        <div className="max-w-[400px] mx-auto flex flex-col items-center h-full  bg-white ">

        {children}

        </div>
      </body>
    </html>
  );
}
