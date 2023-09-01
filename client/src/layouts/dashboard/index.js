import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import SidebarNav from "./SidebarNav";

const DashboardLayout = () => {
	const { isLoggedIn } = useSelector((state) => state.auth);

	if (!isLoggedIn) {
		return <Navigate to={"/auth/login"} />;
	}

	return (
		<>
			<Stack direction={"row"}>
				<SidebarNav />
				<Outlet />
			</Stack>
		</>
	);
};

export default DashboardLayout;
