import { GitHubRepository } from "./GitHubRepository";

export interface GitHubRepositoryRepository {
	search(respositoryUrls: string[]): Promise<GitHubRepository[]>;
}
