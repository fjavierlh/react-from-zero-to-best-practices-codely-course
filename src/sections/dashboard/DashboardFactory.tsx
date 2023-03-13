import { ReactElement } from "react";

import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/LocalStorageGitHubAccessTokenRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/LocalStorageRepositoryWidgetRepository";
import { Dashboard } from "./Dashboard";
import { useRepositoryWidgetContext } from "./repositoryWidget/RepositoryWidgetContextProvider";

const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

const gitHubAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	gitHubAccessTokenRepository.search()
);

export function DashboardFactory(): ReactElement {
	const { repositoryWidgets } = useRepositoryWidgetContext();

	return (
		<Dashboard
			gitHubRepositoryRepository={gitHubRepositoryRepository}
			repositoryWidgetRepository={repositoryWidgetRepository}
			repositoryWidgets={repositoryWidgets}
		/>
	);
}
