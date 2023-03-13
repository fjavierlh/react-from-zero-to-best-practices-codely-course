import { GitHubAccessTokenRepository } from "../../domain/GitHubAccessTokenRepository";

export function useSaveConfig(repository: GitHubAccessTokenRepository): {
	save: (token: string) => void;
} {
	const save = (token: string): void => {
		repository.save(token);
	};

	return { save };
}
