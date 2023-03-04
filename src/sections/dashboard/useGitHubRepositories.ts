import { useEffect, useState } from "react";

import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "./../../domain/GitHubRepositoryRepository";

export function useGitHubRepositories(
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): { gitHubRepositories: GitHubRepository[]; isLoading: boolean } {
	const [gitHubRepositories, setGitHubRespositories] = useState<GitHubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		repository.search(repositoryUrls).then((responses) => {
			setGitHubRespositories(responses);
			setIsLoading(false);
		});
	}, [repository, repositoryUrls]);

	return { gitHubRepositories, isLoading };
}
