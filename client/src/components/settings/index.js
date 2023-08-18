import PropTypes from "prop-types";
import ThemeColorPresets from "./ThemeColorPresets";
import ThemeContrast from "./ThemeContrast";

ThemeSettings.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function ThemeSettings({ children }) {
	return (
		<ThemeColorPresets>
			<ThemeContrast>{children}</ThemeContrast>
		</ThemeColorPresets>
	);
}
