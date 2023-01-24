import { useEffect, useState } from "react";

import { GitHubRepository, RepositoryId } from "./../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "./../../domain/GitHubRepositoryRepository";

export function useGitHubRepository(
	repository: GitHubRepositoryRepository,
	repositoryId: RepositoryId
): { gitHubRepository: GitHubRepository | undefined } {
	const [gitHubRepository, setRepositoryData] = useState<GitHubRepository | undefined>();

	useEffect(() => {
		repository
			.byId(repositoryId)
			.then((gitHubRepository) => setRepositoryData(gitHubRepository))
			.catch((error) => console.error(error));
	}, [repository, repositoryId]);

	return { gitHubRepository };
}
