import { useMemo } from "react";

import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./Dashboard.module.scss";
import { AddRepositoryWidgetForm } from "./repositoryWidget/AddRepositoryWidgetForm";
import { GitHubRepositoryWidget } from "./repositoryWidget/GitHubRepositoryWidget";
import { useGitHubRepositories } from "./repositoryWidget/useGitHubRepositories";
import { WidgetsSkeleton } from "./repositoryWidget/WidgetSkeleton";

export function Dashboard({
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
}: {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
}) {
	const gitHubRepositoriesUrls = useMemo(
		() => config.widgets.map((widget) => widget.repository_url),
		[]
	);
	const { gitHubRepositories, isLoading } = useGitHubRepositories(
		gitHubRepositoryRepository,
		gitHubRepositoriesUrls
	);

	return (
		<>
			{isLoading && (
				<section className={styles.container}>
					<WidgetsSkeleton numberOfWidgets={gitHubRepositoriesUrls.length} />
				</section>
			)}
			{!isLoading && gitHubRepositories.length === 0 ? (
				<div>
					<span>No hay widgets configurados</span>
				</div>
			) : (
				<section className={styles.container}>
					{gitHubRepositories.map((widget) => (
						<GitHubRepositoryWidget
							key={`${widget.id.organization}/${widget.id.name}`}
							widget={widget}
						/>
					))}
					<AddRepositoryWidgetForm repositoryWidget={repositoryWidgetRepository} />
				</section>
			)}
		</>
	);
}
