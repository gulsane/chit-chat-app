import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const SidebarContainer = ({ children }) => {
	const theme = useTheme();
	const { sideBar } = useSelector((state) => state.app);
	if (!sideBar.open) {
		return <></>;
	}

	return (
		<Box
			sx={{
				overflowY: "scroll",
				width: 340,
				height: "100vh",
				backgroundColor:
					theme.palette.mode === "light" ? "#f8faff" : theme.palette.background,
				boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
			}}
		>
			{children}
		</Box>
	);
};

export default SidebarContainer;
