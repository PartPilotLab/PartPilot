import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import NavHeader from "@/lib/components/NavHeader";
import NavFooter from "@/lib/components/NavFooter";
// import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

// import GoogleAnalytics from "@/lib/components/GoogleAnalytics";
// import { CookiesBanner } from "@/lib/components/CookieBanner";
import { Suspense } from "react";
const myFont = localFont({
  src: "../public/fonts/Montserrat-Regular.woff2",
});

export const metadata: Metadata = {
  title: "PartPilot - Electronics Part Management",
  description: "Free And Open Source Electronics Part Management For LCSC",
  // metadataBase: new URL("https://www.redradar.de"),
  // openGraph: {
  //   url: "https://www.redradar.de",
  //   title: "RedeRadar - Powerpoint Karaoke",
  //   description: "Die kostenfreie Kapopo-Alternative für Powerpoint Karaoke",
  //   type: "website",
  //   locale: "de_DE",
  //   siteName: "RedeRadar",
  //   images: [
  //     {
  //       url: "https://www.rederadar.de/images/rederadar-logo.png",
  //       width: 1024,
  //       height: 1024,
  //       alt: "RedeRadar - Powerpoint Karaoke",
  //     },
  //   ],
  // },
};

const theme = createTheme({
  fontFamily: myFont.style.fontFamily,
  primaryColor: "cyan",
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://www.rederadar.de/" /> */}

        <meta property="og:site_name" content="PartPilot" />
        <meta property="og:description" content="Free And Open Source Electronics Part Management For LCSC" />

        <meta name="description" content="Free And Open Source Electronics Part Management For LCSC" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="PartPilot" />
        <meta name="keywords" content="PartPilot, Electronics Part Management, LCSC, BOM" />
        <meta name="google" content="notranslate" />
        <ColorSchemeScript />
      </head>
      {/* <Suspense fallback="">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-RCBF6LQ59X" /></Suspense> */}
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          {
            <section style={{ padding: 0, margin: 0 }}>
              <nav style={{ height: "60px" }}>
                <NavHeader />
              </nav>
              <main>{children}</main>
              <footer>
                <NavFooter />
              </footer>
            </section>
          }
          {/* <CookiesBanner /> */}
        </MantineProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
