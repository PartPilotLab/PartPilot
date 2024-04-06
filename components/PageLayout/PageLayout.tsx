'use client'

import {ReactNode} from "react";
import {Notifications} from "@mantine/notifications";
import NavHeader from "@/lib/components/NavHeader";
import NavFooter from "@/lib/components/NavFooter";
import {createTheme, MantineProvider} from "@mantine/core";
import localFont from "next/font/local";
import {SettingsProvider, SettingsConsumer, Settings} from "@/components/SettingsProvider";
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";

const myFont = localFont({
	src: "../../public/fonts/Montserrat-Regular.woff2",
});

const theme = createTheme({
	fontFamily: myFont.style.fontFamily,
	primaryColor: "light",
	colors: {
		"light": [
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

type Props = {
	children: ReactNode,
	session: Session
}

export default function PageLayout({children, session}: Props) {
	return (
		<MantineProvider theme={theme}>
			<Notifications/>
			<SessionProvider session={session}>
			<SettingsProvider>
				<SettingsConsumer>
					{({initialized}: Settings) => {
						return initialized && (
							<section style={{padding: 0, margin: 0}}>
								<nav style={{height: "60px"}}>
									<NavHeader/>
								</nav>
								<main>{children}</main>
								<footer>
									<NavFooter/>
								</footer>
							</section>
						)
					}}
				</SettingsConsumer>
			</SettingsProvider>
			</SessionProvider>
		</MantineProvider>
	)
}
