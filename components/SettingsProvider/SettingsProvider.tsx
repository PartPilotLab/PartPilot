import {createContext, ReactNode, useCallback, useEffect, useState} from 'react';
import {useWindowEvent} from "@mantine/hooks";

const SettingsContext = createContext(null);

const settingsKey = 'APP.SETTINGS';

export type Settings = {
	initialized: boolean,
	paletteMode: 'light' | 'dark'
}

const defaultValues: Settings = {
	paletteMode: 'light',
	initialized: false
}

type Props = {
	children: ReactNode
}

export default function SettingsProvider({children}: Props) {
	const [settings, setSettings] = useState<Settings>(defaultValues)

	const updateSettings = useCallback((values: Partial<Settings>) => {
		setSettings(prevState => {
			const newState = {...prevState, ...values}
			localStorage.setItem(settingsKey, JSON.stringify(newState))
			if (values.paletteMode) document.documentElement.setAttribute("data-mantine-color-scheme", values.paletteMode);
			return newState
		});
	}, [])

	useEffect(() => {
		const storedSettings = localStorage.getItem(settingsKey);
		if (storedSettings) updateSettings({...JSON.parse(storedSettings), initialized: true})
		else updateSettings( {initialized: true})
	}, [])

	useWindowEvent('keydown', e => {
		if (e.ctrlKey && e.key === 'j') updateSettings({paletteMode: settings.paletteMode === 'dark' ? 'light' : 'dark'})
	});

	return (
		<SettingsContext.Provider value={settings}>
			{children}
		</SettingsContext.Provider>
	)
}

export const SettingsConsumer = SettingsContext.Consumer;
