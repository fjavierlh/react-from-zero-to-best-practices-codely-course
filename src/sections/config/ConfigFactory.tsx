import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/LocalStorageGitHubAccessTokenRepository";
import { Config } from "./Config";

const repository = new LocalStorageGitHubAccessTokenRepository();

export class ConfigFactory {
	static create() {
		return <Config repository={repository}></Config>;
	}
}
