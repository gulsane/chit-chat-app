import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import getColorPresets, {
	defaultPreset,
	colorPresets,
} from "../utils/getColorPresets";
import { defaultSettings } from "../config";

const initialState = {
	...defaultSettings,

	onToggleMode: () => {},
	onChangeMode: () => {},

	onToggleDirection: () => {},
	onChangeDirection: () => {},

	onToggleLayout: () => {},
	onChangeLayout: () => {},

	onToggleContrast: () => {},
	onChangeContrast: () => {},

	onToggleStretch: () => {},

	onChangeColor: () => {},

	onResetSetting: () => {},
	setColor: defaultPreset,
	colorOption: [],
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
			...settings,
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

	const onToggleLayout = () => {
		setSettings({
			...settings,
			themeLayout: settings.themeLayout === "vertical" ? "horizontal" : "vertical",
		});
	};

	const onChangeLayout = (event) => {
		setSettings({
			...settings,
			themeLayout: event.target.value,
		});
	};

	const onToggleContrast = () => {
		setSettings({
			...settings,
			themeContrast: settings.themeContrast === "default" ? "bold" : "default",
		});
	};

	const onChangeContrast = (event) => {
		setSettings({
			...settings,
			themeContrast: event.target.value,
		});
	};

	const onToggleStretch = () => {
		setSettings({
			...settings,
			themeStretch: !settings.themeStretch,
		});
	};

	const onChangeColor = (event) => {
		setSettings({
			...settings,
			themeColorPresets: event.target.value,
		});
	};

	const onResetSetting = () => {
		setSettings({
			themeMode: initialState.themeMode,
			themeLayout: initialState.themeLayout,
			themeStretch: initialState.themeStretch,
			themeContrast: initialState.themeContrast,
			themeDirection: initialState.themeDirection,
			themeColorPresets: initialState.themeColorPresets,
		});
	};

	return (
		<SettingsContext.Provider
			value={{
				...settings,
				onToggleMode,
				onChangeMode,
				onToggleDirection,
				onChangeDirection,
				onToggleLayout,
				onChangeLayout,
				onToggleContrast,
				onChangeContrast,
				onToggleStretch,
				onResetSetting,
				onChangeColor,
				setColor: getColorPresets(settings.themeColorPresets),
				colorOption: colorPresets.map((color) => ({
					name: color.name,
					value: color.main,
				})),
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export { SettingsContext };

export default SettingsProvider;
