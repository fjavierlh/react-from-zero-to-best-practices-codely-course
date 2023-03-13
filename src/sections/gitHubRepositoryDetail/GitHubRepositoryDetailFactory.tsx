import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { GitHubApiGitHubRepositoryPullRequestRepository } from "../../infrastructure/GItHubApiRepositoryPullRequestRepository";
import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/LocalStorageGitHubAccessTokenRepository";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";

const gitHubAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const gitHubAccessToken = gitHubAccessTokenRepository.search();
const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(gitHubAccessToken);
const gitHubRepositoryPullRequestsRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	gitHubAccessToken
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
