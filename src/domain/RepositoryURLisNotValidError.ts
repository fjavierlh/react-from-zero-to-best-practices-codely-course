export class RepositoryURLisNotValidError extends Error {
	constructor(url: string) {
		super(`The ${url} is not valid URL`);
	}
}
