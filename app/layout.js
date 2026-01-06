
import "./globals.css";

export const metadata = {
  title: "Phoenix Dental Care",
  description: "Dr. Divya's Phoenix Dental Care",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-700">{children}</body>
    </html>
  );
}
