import { useEffect, useState } from "react";

import { GitHubRepository, RepositoryId } from "./../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "./../../domain/GitHubRepositoryRepository";

export function useGitHubRepository(
	repository: GitHubRepositoryRepository,
	repositoryId: RepositoryId
): { gitHubRepository: GitHubRepository | undefined; isLoading: boolean } {
	const [gitHubRepository, setRepositoryData] = useState<GitHubRepository | undefined>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		repository.byId(repositoryId).then((gitHubRepository) => {
			setIsLoading(false);
			setRepositoryData(gitHubRepository);
		});
	}, [repository, repositoryId]);

	return { gitHubRepository, isLoading };
}
