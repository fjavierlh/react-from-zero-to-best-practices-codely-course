import { githubApiResponses } from "../../github_api_responses";
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

export function Dashboard() {
	return (
		<>
			<section className={styles.container}>
				{githubApiResponses.map((repository) => (
					<article className={styles.widget} key={repository.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={repository.repositoryData.html_url}
								target="_blank"
								title={`${repository.repositoryData.organization.login}/${repository.repositoryData.name}`}
								rel="noreferrer"
							>
								{repository.repositoryData.organization.login}/{repository.repositoryData.name}
							</a>
							{repository.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<p>Last update {isoToReadableDate(repository.repositoryData.updated_at)}</p>
						{repository.CiStatus.workflow_runs.length && (
							<div>
								{repository.CiStatus.workflow_runs[0].status === "completed" ? (
									<Check />
								) : (
									<Error />
								)}
							</div>
						)}
					</article>
				))}
			</section>
		</>
	);
}
