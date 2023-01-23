import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DashboardFactory } from "./sections/dashboard/DashboardFactory";
import { GitHubReposirotyDetail } from "./sections/detail/GitHubRepositoryDetail";
import { Layout } from "./sections/layout/Layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: DashboardFactory.create(),
			},
			{
				path: "/repository/:organization/:name",
				element: <GitHubReposirotyDetail />,
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
