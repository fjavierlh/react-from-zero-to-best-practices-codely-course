import { InMemoryGitHubRepositoryRepository } from "../../infrastructure/inMemoryGitHubRepository";
import { ReactComponent as Check } from "./check.svg";
import styles from "./Dashboard.module.scss";
import { ReactComponent as Error } from "./error.svg";
import { ReactComponent as Lock } from "./lock.svg";
import { ReactComponent as Unlock } from "./unlock.svg";

const isoToReadableDate = (updatedAt: string): string => {
	const lastUpdate = new Date(updatedAt);
	const currentDate = new Date();
	const diffDays = lastUpdate.getDate() - currentDate.getDate();

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

const gitHubResponses = new InMemoryGitHubRepositoryRepository();

export function Dashboard() {
	const repository = gitHubResponses.search();

	return (
		<>
			<section className={styles.container}>
				{repository.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.organization.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
						{widget.CiStatus.workflow_runs.length && (
							<div>
								{widget.CiStatus.workflow_runs[0].status === "completed" ? <Check /> : <Error />}
							</div>
						)}
					</article>
				))}
			</section>
		</>
	);
}
