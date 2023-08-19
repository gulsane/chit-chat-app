import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div>
			<h3>Auth Layout</h3>
			<Outlet />
		</div>
	);
};
const router = createBrowserRouter([
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "register",
				element: <h4>this is register page</h4>,
			},
		],
	},
	{ path: "/", element: <h1>this is chatting app</h1> },
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
