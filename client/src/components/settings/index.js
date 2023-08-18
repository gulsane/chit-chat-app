import PropTypes from "prop-types";
import ThemeColorPresets from "./ThemeColorPresets";
import ThemeContrast from "./ThemeContrast";
import ThemeLocalization from "./ThemeLocalization";

ThemeSettings.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function ThemeSettings({ children }) {
	return (
		<ThemeColorPresets>
			<ThemeContrast>
				<ThemeLocalization>{children}</ThemeLocalization>
			</ThemeContrast>
		</ThemeColorPresets>
	);
}
