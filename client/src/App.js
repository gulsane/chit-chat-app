import ThemeProvider from "./theme";
import ThemeSettings from "./components/settings";
import Router from "./routes";

function App() {
	return (
		<ThemeProvider>
			<ThemeSettings>
				<Router />
			</ThemeSettings>
		</ThemeProvider>
	);
}

export default App;
