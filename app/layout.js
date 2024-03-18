import { Lato } from "next/font/google";
import "@/styles/globals.css";
import ThirdPartyProvider from "@/context/ThirdPartyProvider";

const fontFamily = Lato({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata = {
  title: "Harmony",
  description:
    "Harmony is a web application created to allow users to visualize their favorite songs in different 2D patterns.",
  openGraph: {
    title: "Harmony",
    description:
      "Harmony is a web application created to allow users to visualize their favorite songs in different 2D patterns.",
    images: "/opengraph-image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <ThirdPartyProvider>{children}</ThirdPartyProvider>
      </body>
    </html>
  );
}
