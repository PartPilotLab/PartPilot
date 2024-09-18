"use client";

import {
  Settings,
  SettingsConsumer,
  SettingsProvider,
} from "@/components/SettingsProvider";
import NavFooter from "@/lib/components/NavFooter";
import NavHeader from "@/lib/components/NavHeader";
import { createTheme, Flex, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import { ReactNode } from "react";

const myFont = localFont({
  src: "../../public/fonts/Montserrat-Regular.woff2",
});

const theme = createTheme({
  fontFamily: myFont.style.fontFamily,
  primaryColor: "light",
  colors: {
    light: [
      "#e8fbfe",
      "#d9f1f6",
      "#b3e1ea",
      "#89d0df",
      "#69c2d5",
      "#55bacf",
      "#47b5cc",
      "#369fb5",
      "#278ea2",
      "#007b8f",
    ],
  },
});

type Props = {
  children: ReactNode;
  session: Session;
};

export default function PageLayout({ children, session }: Props) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <SessionProvider session={session}>
        <SettingsProvider>
          <SettingsConsumer>
            {({ initialized }: Settings) => {
              return (
                initialized && (
                  <section
                    style={{
                      padding: 0,
                      margin: 0,
                      minHeight: "100vh",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <nav style={{ height: "60px" }}>
                      <NavHeader />
                    </nav>
                    <Flex direction="column" style={{ flex: 1 }}>
                      <main style={{ flex: 1 }}>{children}</main>
                      <footer>
                        <NavFooter />
                      </footer>
                    </Flex>
                  </section>
                )
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </SessionProvider>
    </MantineProvider>
  );
}
