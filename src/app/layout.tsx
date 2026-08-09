import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Memoir by BeatRoute Band - Custom Songs",
  description: "Memoir by BeatRoute Band: Get a professionally written, composed, and produced custom song for your special moments.",
  metadataBase: new URL("https://memoir-lime-five.vercel.app"),
  icons: {
    icon: [
      { url: "/M_square.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" }
    ],
    shortcut: "/M_square.png",
    apple: "/M_square.png",
  },
  openGraph: {
    title: "Memoir by BeatRoute Band - Custom Songs",
    description: "Memoir by BeatRoute Band: Get a professionally written, composed, and produced custom song for your special moments.",
    url: "https://memoir-lime-five.vercel.app",
    siteName: "Memoir by BeatRoute Band",
    images: [
      {
        url: "/M_square.png",
        width: 1024,
        height: 1024,
        alt: "Memoir by BeatRoute Band",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Memoir by BeatRoute Band - Custom Songs",
    description: "Memoir by BeatRoute Band: Get a professionally written, composed, and produced custom song for your special moments.",
    images: ["/M_square.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-ivory text-brand-black">{children}</body>
    </html>
  );
}
