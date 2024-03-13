import { Lato } from "next/font/google";
import "@/styles/globals.css";
import ThirdPartyProvider from "@/context/ThirdPartyProvider";

const fontFamily = Lato({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
