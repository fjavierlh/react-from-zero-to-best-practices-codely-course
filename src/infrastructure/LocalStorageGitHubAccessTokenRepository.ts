import { config } from "../devdash_config";
import { GitHubAccessTokenRepository } from "../domain/GitHubAccessTokenRepository";

export class LocalStorageGitHubAccessTokenRepository implements GitHubAccessTokenRepository {
	localStorageKey = "github_access_token";
	search(): string {
		const token = localStorage.getItem(this.localStorageKey);
		const defaultToken = window.location.hostname.includes("localhost")
			? config.github_access_token
			: "";

		return token ?? defaultToken;
	}

	save(token: string): void {
		localStorage.setItem(this.localStorageKey, token);
	}
}
