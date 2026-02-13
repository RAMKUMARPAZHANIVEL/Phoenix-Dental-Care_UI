
import "./globals.css";

export const metadata = {
  title: "Phoenix Dental Care",
  description: "Dr. Divya's Phoenix Dental Care",
   icons: {
    icon: "/favicon.jpeg",
  },
};

import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-white text-gray-700">{children}</body>
    </html>
  );
}
