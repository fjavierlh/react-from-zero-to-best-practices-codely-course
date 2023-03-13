import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RouterMiddleware } from "./router/RouterMiddleware";
import { ConfigFactory } from "./sections/config/ConfigFactory";
import { DashboardFactory } from "./sections/dashboard/DashboardFactory";
import { GitHubRepositoryDetailFactory } from "./sections/gitHubRepositoryDetail/GitHubRepositoryDetailFactory";
import { Layout } from "./sections/layout/Layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RouterMiddleware>
				<Layout />
			</RouterMiddleware>
		),
		children: [
			{
				path: "/",
				element: <DashboardFactory />,
			},
			{
				path: "/repository/:organization/:name",
				element: GitHubRepositoryDetailFactory.create(),
			},
			{ path: "/config", element: ConfigFactory.create() },
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
