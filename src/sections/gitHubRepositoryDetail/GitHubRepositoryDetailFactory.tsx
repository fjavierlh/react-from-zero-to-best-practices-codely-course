import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

export class GitHubRepositoryDetailFactory {
	static create() {
		return <GitHubRepositoryDetail repository={repository} />;
	}
}
