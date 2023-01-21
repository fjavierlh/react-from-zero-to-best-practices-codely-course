import { useEffect, useState } from "react";

import { config } from "../../devdash_config";
import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { ReactComponent as Brand } from "./brand.svg";
import { ReactComponent as Check } from "./check.svg";
import styles from "./Dashboard.module.scss";
import { ReactComponent as Error } from "./error.svg";
import { ReactComponent as PullRequests } from "./git-pull-request.svg";
import { ReactComponent as IssueOpened } from "./issue-opened.svg";
import { ReactComponent as Lock } from "./lock.svg";
import { ReactComponent as Forks } from "./repo-forked.svg";
import { ReactComponent as Start } from "./star.svg";
import { ReactComponent as Unlock } from "./unlock.svg";
import { ReactComponent as Watchers } from "./watchers.svg";

const isoToReadableDate = (updatedAt: Date): string => {
	const currentDate = new Date();
	const diffDays = currentDate.getDate() - updatedAt.getDate();

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

interface Props {
	repository: GitHubRepositoryRepository;
}

export function Dashboard({ repository }: Props) {
	const [gitHubRespositories, setGitHubRespositories] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((responses) => {
				setGitHubRespositories(responses);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			{gitHubRespositories.length === 0 ? (
				<div>
					<span>No hay widgets configurados</span>
				</div>
			) : (
				<section className={styles.container}>
					{gitHubRespositories.map((widget) => (
						<article className={styles.widget} key={widget.id.name}>
							<header className={styles.widget__header}>
								<h2>
									<a
										className={styles.widget__title}
										href={widget.url}
										target="_blank"
										title={`${widget.id.organization}/${widget.id.name}`}
										rel="noreferrer"
									>
										{widget.id.organization}/{widget.id.name}
									</a>
								</h2>
								{widget.private ? <Lock /> : <Unlock />}
							</header>
							<div className={styles.widget__body}>
								<div className={styles.widget__status}>
									<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
									{widget.hasWorkflows && (
										<div>{widget.isLastWorkflowSuccess ? <Check /> : <Error />}</div>
									)}
								</div>
								<p className={styles.widget__description}>{widget.description}</p>
							</div>
							<footer className={styles.widget__footer}>
								<div className={styles.widget__stat}>
									<Start />
									<span>{widget.stars}</span>
								</div>
								<div className={styles.widget__stat}>
									<Watchers />
									<span>{widget.watchers}</span>
								</div>
								<div className={styles.widget__stat}>
									<Forks />
									<span>{widget.forks}</span>
								</div>
								<div className={styles.widget__stat}>
									<IssueOpened />
									<span>{widget.issues}</span>
								</div>
								<div className={styles.widget__stat}>
									<PullRequests />
									<span>{widget.pullRequests}</span>
								</div>
							</footer>
						</article>
					))}
				</section>
			)}
		</>
	);
}
