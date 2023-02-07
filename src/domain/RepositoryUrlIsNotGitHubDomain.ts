export class RepositoryUrlIsNotGitHubDomainError extends Error {
	constructor(url: string) {
		super(`URL '${url}' is not Git Hub domain `);
	}
}
