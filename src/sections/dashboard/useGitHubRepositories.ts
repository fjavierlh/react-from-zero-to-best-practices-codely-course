import { useEffect, useState } from "react";

import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "./../../domain/GitHubRepositoryRepository";

export function useGitHubRepositories(
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): { gitHubRepositories: GitHubRepository[] } {
	const [gitHubRespositories, setGitHubRespositories] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(repositoryUrls)
			.then((responses) => {
				setGitHubRespositories(responses);
			})
			.catch((error) => console.error(error));
	}, [repository, repositoryUrls]);

	return { gitHubRepositories: gitHubRespositories };
}
