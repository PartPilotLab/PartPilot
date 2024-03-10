import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import NavHeader from "@/lib/components/NavHeader";
import NavFooter from "@/lib/components/NavFooter";
import localFont from "next/font/local";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

const myFont = localFont({
  src: "../public/fonts/Montserrat-Regular.woff2",
});

export const metadata: Metadata = {
  title: "PartPilot - Electronics Part Management",
  description: "Free And Open Source Electronics Part Management For LCSC",
};

const theme = createTheme({
  fontFamily: myFont.style.fontFamily,
  primaryColor: "partpilot-blue",
  colors: {
    "partpilot-blue": [
      "#e8fbfe",
      "#d9f1f6",
      "#b3e1ea",
      "#89d0df",
      "#69c2d5",
      "#55bacf",
      "#47b5cc",
      "#369fb5",
      "#278ea2",
      "#007b8f"
    ]
  },
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
        <link rel="shortcut icon" href="/icon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon/favicon-16x16.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PartPilot" />
        <meta
          property="og:description"
          content="Free And Open Source Electronics Part Management For LCSC"
        />

        <meta
          name="description"
          content="Free And Open Source Electronics Part Management For LCSC"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="PartPilot" />
        <meta
          name="keywords"
          content="PartPilot, Electronics Part Management, LCSC, BOM"
        />
        <meta name="google" content="notranslate" />
        <ColorSchemeScript />
      </head>
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
        </MantineProvider>
      </body>
    </html>
  );
}
