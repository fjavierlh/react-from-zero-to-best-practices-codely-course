export interface DevDashConfig {
	github_access_token: string;
	widgets: {
		id: string;
		repository_url: string;
	}[];
}

export const config: DevDashConfig = {
	github_access_token: process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN as string,
	widgets: [
		{
			id: "997d2c56-917c-11ed-a1eb-0242ac120002",
			repository_url: "https://github.com/fjavierlh/guia-social",
		},
		{
			id: "a14551a2-917c-11ed-a1eb-0242ac120002",
			repository_url: "https://github.com/fjavierlh/nodejs-api-image-resizer",
		},
		{
			id: "a558de12-917c-11ed-a1eb-0242ac120002",
			repository_url: "https://github.com/fjavierlh/typescript-ddd-training",
		},
	],
};
