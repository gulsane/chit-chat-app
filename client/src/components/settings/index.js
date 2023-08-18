import PropTypes from "prop-types";

ThemeSettings.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function ThemeSettings({ children }) {
	return <>{children}</>;
}
