import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import SettingsProvider from "./contexts/SettingsContext";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<SettingsProvider>
				<App />
			</SettingsProvider>
		</HelmetProvider>
	</React.StrictMode>
);

reportWebVitals();
