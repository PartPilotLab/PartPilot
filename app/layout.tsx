import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";
import "@mantine/notifications/styles.css";
import {PageLayout} from "@/components/PageLayout";
import {getServerSession} from "next-auth";

export const metadata: Metadata = {
  title: "PartPilot - Electronics Part Management",
  description: "Free And Open Source Electronics Part Management For LCSC",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()

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
      </head>
      <body>
        <PageLayout session={session}>
          {children}
        </PageLayout>
      </body>
    </html>
  );
}
