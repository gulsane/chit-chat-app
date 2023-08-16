import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { defaultSettings } from "../config";

const initialState = {
	...defaultSettings,

	onToggleMode: () => {},
	onChangeMode: () => {},

	onToggleDirection: () => {},
	onChangeDirection: () => {},
};

const SettingsContext = createContext(initialState);

const SettingsProvider = ({ children }) => {
	const [settings, setSettings] = useLocalStorage("settings", {
		themeMode: initialState.themeMode,
		themeLayout: initialState.themeLayout,
		themeStretch: initialState.themeStretch,
		themeContrast: initialState.themeContrast,
		themeDirection: initialState.themeDirection,
		themeColorPresets: initialState.themeColorPresets,
	});

	const onToggleMode = () => {
		setSettings({
			...setSettings,
			themeMode: settings.themeMode === "light" ? "dark" : "light",
		});
	};

	const onChangeMode = (event) => {
		setSettings({
			...settings,
			themeMode: event.target.value,
		});
	};

	const onToggleDirection = () => {
		setSettings({
			...settings,
			themeDirection: settings.themeDirection === "rtl" ? "ltr" : "rtl",
		});
	};
	const onChangeDirection = (event) => {
		setSettings({
			...settings,
			themeDirection: event.target.value,
		});
	};
	return (
		<SettingsContext.Provider
			value={{
				...settings,
				onToggleMode,
				onChangeMode,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export { SettingsContext };

export default SettingsProvider;
