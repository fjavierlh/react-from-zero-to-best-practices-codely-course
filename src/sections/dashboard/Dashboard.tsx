import { useMemo } from "react";

import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { RepositoryWidget } from "../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./Dashboard.module.scss";
import { AddRepositoryWidgetForm } from "./repositoryWidget/AddRepositoryWidgetForm";
import { GitHubRepositoryWidget } from "./repositoryWidget/GitHubRepositoryWidget";
import { useGitHubRepositories } from "./repositoryWidget/useGitHubRepositories";
import { WidgetsSkeleton } from "./repositoryWidget/WidgetSkeleton";

export function Dashboard({
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
	repositoryWidgets: repositoryWidget,
}: {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
	repositoryWidgets: RepositoryWidget[];
}) {
	const gitHubRepositoriesUrls = useMemo(
		() => repositoryWidget.map((widget) => widget.url),
		[repositoryWidget]
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
