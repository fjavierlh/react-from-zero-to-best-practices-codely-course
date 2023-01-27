import { useEffect, useState } from "react";

import { RepositoryId } from "../../domain/GitHubRepository";
import { GitHubRepositoryPullRequest } from "../../domain/GitHubRepositoryPullRequest";
import { GitHubRepositoryPullRequestRepository } from "../../domain/GitHubRepositoryPullRequestRepository";

export function useGitHubRepositoryPullRequests(
	repository: GitHubRepositoryPullRequestRepository,
	respositoryId: RepositoryId
): { pullRequests: GitHubRepositoryPullRequest[]; isLoading: boolean } {
	const [pullRequests, setPullRequests] = useState<GitHubRepositoryPullRequest[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		repository
			.search(respositoryId)
			.then((pullRequests) => {
				setPullRequests(pullRequests);
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	}, [repository, respositoryId]);

	return { pullRequests, isLoading };
}
