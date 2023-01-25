import { useMemo } from "react";

import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";
import { WidgetsSkeleton } from "./WidgetSkeleton";

export function Dashboard({ repository }: { repository: GitHubRepositoryRepository }) {
	const gitHubRepositoriesUrls = useMemo(
		() => config.widgets.map((widget) => widget.repository_url),
		[]
	);
	const { gitHubRepositories, isLoading } = useGitHubRepositories(
		repository,
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
				</section>
			)}
		</>
	);
}
