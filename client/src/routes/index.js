import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import DashboardLayout from "../layouts/dashboard";

const LoadingScreen = () => {
	return <h4>loading....</h4>;
};

const Loadable = (Component) => (props) => {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);
};

const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const VerifyOTPPage = Loadable(lazy(() => import("../pages/auth/VerifyOTP")));
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const ResetPasswordPage = Loadable(
	lazy(() => import("../pages/auth/ResetPassword"))
);
const NewPasswordPage = Loadable(
	lazy(() => import("../pages/auth/NewPassword"))
);
const GeneralApp = Loadable(
	lazy(() => import("../pages/dashboard/GeneralApp"))
);

const routes = [
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
			{
				path: "reset-password",
				element: <ResetPasswordPage />,
			},
			{
				path: "new-password",
				element: <NewPasswordPage />,
			},
			{
				path: "verify-otp",
				element: <VerifyOTPPage />,
			},
		],
	},
	{
		path: "/",
		element: <DashboardLayout />,
		children: [
			{ path: "/app", element: <GeneralApp /> },
			{ path: "/group", element: <h4>this is group page</h4> },
			{ path: "/call", element: <h4>this is call page</h4> },
			{ path: "/settings", element: <h4>this is settings page</h4> },
			{ path: "/profile", element: <h4>this is Profile page</h4> },
		],
	},
];

const router = createBrowserRouter(routes);

export default function Router() {
	return <RouterProvider router={router} />;
}
