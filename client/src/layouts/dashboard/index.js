import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
	const { isLoggedIn } = useSelector((state) => state.auth);

	if (!isLoggedIn) {
		return <Navigate to={"/auth/login"} />;
	}

	return <h1>this is chatting app</h1>;
};

export default DashboardLayout;
