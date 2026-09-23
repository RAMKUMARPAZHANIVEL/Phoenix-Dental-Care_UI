import "./globals.css";
import { Montserrat, Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/footer";

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

export const metadata = {
  title: {
    default: "Phoenix Dental Care — Chitlapakkam, Chennai",
    template: "%s | Phoenix Dental Care",
  },
  description:
    "Dr. Divya's Phoenix Dental Care in Chitlapakkam, Chennai — gentle, advanced, and affordable dental care for all ages.",
  openGraph: {
    siteName: "Phoenix Dental Care",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.phoenixdentalcare.in/images/Logo.jpeg",
        width: 400,
        height: 400,
        alt: "Phoenix Dental Care",
      },
    ],
  },
  icons: {
    icon: "/favicon.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-white text-gray-700">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
