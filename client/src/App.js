import ThemeProvider from "./theme";
import ThemeSettings from "./components/settings";
import Router from "./routes";
import AppSnackbar from "./components/snackbar/Snackbar";

function App() {
	return (
		<>
			<ThemeProvider>
				<ThemeSettings>
					<Router />
				</ThemeSettings>
			</ThemeProvider>
			<AppSnackbar />
		</>
	);
}

export default App;
