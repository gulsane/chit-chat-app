import ThemeProvider from "./theme";
import ThemeSettings from "./components/settings";

function App() {
	return (
		<ThemeProvider>
			<ThemeSettings>
				<h1>this is chatting app</h1>
			</ThemeSettings>
		</ThemeProvider>
	);
}

export default App;
