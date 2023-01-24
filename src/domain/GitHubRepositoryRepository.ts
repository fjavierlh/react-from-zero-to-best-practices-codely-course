import { GitHubRepository, RepositoryId } from "./GitHubRepository";

export interface GitHubRepositoryRepository {
	search(respositoryUrls: string[]): Promise<GitHubRepository[]>;
	byId(repositoryId: RepositoryId): Promise<GitHubRepository>;
}
