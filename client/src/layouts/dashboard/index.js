import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarNav from "./SidebarNav";

const DashboardLayout = () => {
	const { isLoggedIn } = useSelector((state) => state.auth);

	if (!isLoggedIn) {
		return <Navigate to={"/auth/login"} />;
	}

	return <SidebarNav></SidebarNav>;
};

export default DashboardLayout;
