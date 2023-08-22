import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import SettingsProvider from "./contexts/SettingsContext";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<ReduxProvider store={store}>
				<SettingsProvider>
					<App />
				</SettingsProvider>
			</ReduxProvider>
		</HelmetProvider>
	</React.StrictMode>
);

reportWebVitals();
