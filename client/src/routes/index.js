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
	{ path: "/", element: <DashboardLayout /> },
];

const router = createBrowserRouter(routes);

export default function Router() {
	return <RouterProvider router={router} />;
}
