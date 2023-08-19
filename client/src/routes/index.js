import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/auth";

const routes = [
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
];

const router = createBrowserRouter(routes);

export default function Router() {
	return <RouterProvider router={router} />;
}
