import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/auth";

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

const routes = [
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <h4>this login page needs to be implemented</h4>,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
			{
				path: "reset-password",
				element: <h4>this reset password page needs to be implemented</h4>,
			},
			{
				path: "new-password",
				element: <h4>this new password page needs to be implemented</h4>,
			},
			{
				path: "verify-otp",
				element: <VerifyOTPPage />,
			},
		],
	},
	{ path: "/", element: <h1>this is chatting app</h1> },
];

const router = createBrowserRouter(routes);

export default function Router() {
	return <RouterProvider router={router} />;
}
