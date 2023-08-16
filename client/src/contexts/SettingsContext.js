import { createContext } from "react";
import { defaultSettings } from "../config";

const initialState = {
	...defaultSettings,
};

const SettingsContext = createContext(initialState);

const SettingsProvider = ({ children }) => {
	return <SettingsContext.Provider>{children}</SettingsContext.Provider>;
};

export { SettingsContext };

export default SettingsProvider;
