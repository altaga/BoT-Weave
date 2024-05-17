import NoSSRWrapper from "@/components/noSSR";
import "@/styles/globals.css";
import { Kanit } from "next/font/google";
import Providers from "../components/providers";

const font = Kanit({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "BoT Weave",
  description: "Access to BoT Weave Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={font.className}>
        <NoSSRWrapper>
          <Providers>{children}</Providers>
        </NoSSRWrapper>
      </body>
    </html>
  );
}
