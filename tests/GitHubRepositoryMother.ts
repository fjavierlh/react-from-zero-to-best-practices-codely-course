import { faker } from "@faker-js/faker";

import { GitHubRepository } from "../src/domain/GitHubRepository";

export class GitHubRepositoryMother {
	static create(params?: Partial<GitHubRepository>): GitHubRepository {
		const defaultParams: GitHubRepository = {
			id: {
				organization: faker.company.name(),
				name: faker.random.word(),
			},
			description: faker.random.words(10),
			url: faker.internet.url(),
			private: faker.datatype.boolean(),
			forks: faker.datatype.number(),
			hasWorkflows: faker.datatype.boolean(),
			isLastWorkflowSuccess: faker.datatype.boolean(),
			stars: faker.datatype.number(),
			issues: faker.datatype.number(),
			pullRequests: faker.datatype.number(),
			updatedAt: faker.datatype.datetime(),
			watchers: faker.datatype.number(),
			workflowRunsStatus: [
				{
					id: faker.datatype.number(),
					name: faker.random.words(),
					title: faker.random.words(),
					url: faker.internet.url(),
					createdAt: faker.datatype.datetime(),
					status: faker.random.word(),
					conclusion: faker.random.word(),
				},
			],
			...params,
		};

		return defaultParams;
	}
}
