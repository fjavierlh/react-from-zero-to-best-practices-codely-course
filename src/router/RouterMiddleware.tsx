import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LocalStorageGitHubAccessTokenRepository } from "../infrastructure/LocalStorageGitHubAccessTokenRepository";
import { GitHubAccessTokenSearcher } from "../sections/config/GitHubAccessTokenSearcher";

const gitHubAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const gitHubAccessTokenSearcher = new GitHubAccessTokenSearcher(gitHubAccessTokenRepository);

export function RouterMiddleware({ children }: { children: React.ReactElement }) {
	const gitHubAccessToken = gitHubAccessTokenSearcher.search();

	const navigate = useNavigate();

	useEffect(() => {
		if (!gitHubAccessToken) {
			navigate("/config");
		}
	}, [gitHubAccessToken, navigate]);

	return <>{children}</>;
}
