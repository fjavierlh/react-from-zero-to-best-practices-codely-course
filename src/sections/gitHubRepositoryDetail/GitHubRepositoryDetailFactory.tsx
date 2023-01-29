import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { GitHubApiGitHubRepositoryPullRequestRepository } from "../../infrastructure/GItHubApiRepositoryPullRequestRepository";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";

const ACCESS_TOKEN = config.github_access_token;

const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(ACCESS_TOKEN);
const gitHubRepositoryPullRequestsRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	ACCESS_TOKEN
);
export class GitHubRepositoryDetailFactory {
	static create() {
		return (
			<GitHubRepositoryDetail
				gitHubRepositoryRepository={gitHubRepositoryRepository}
				gitHubRepositoryPullRequestsRepository={gitHubRepositoryPullRequestsRepository}
			/>
		);
	}
}
