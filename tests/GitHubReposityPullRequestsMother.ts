import { faker } from "@faker-js/faker";

import { GitHubRepositoryPullRequest } from "./../src/domain/GitHubRepositoryPullRequest";

export class GitHubRepositoryPullRequestsMother {
	static create(params?: Partial<GitHubRepositoryPullRequest>): GitHubRepositoryPullRequest {
		return {
			id: faker.datatype.number(),
			title: faker.random.words(),
			createdAt: faker.datatype.datetime(),
			url: faker.internet.url(),
			...params,
		};
	}
}
