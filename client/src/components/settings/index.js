import PropTypes from "prop-types";
import ThemeColorPresets from "./ThemeColorPresets";
import ThemeContrast from "./ThemeContrast";
import ThemeLocalization from "./ThemeLocalization";
import ThemeRtlLayout from "./ThemeRtlLayout";
import SettingDrawer from "../drawer";

ThemeSettings.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function ThemeSettings({ children }) {
	return (
		<ThemeColorPresets>
			<ThemeContrast>
				<ThemeLocalization>
					<ThemeRtlLayout>
						{children}
						<SettingDrawer />
					</ThemeRtlLayout>
				</ThemeLocalization>
			</ThemeContrast>
		</ThemeColorPresets>
	);
}
