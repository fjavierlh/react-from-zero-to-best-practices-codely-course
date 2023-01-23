import { GitHubRepository } from "../../domain/GitHubRepository";
import { ReactComponent as Check } from "./check.svg";
import { ReactComponent as Error } from "./error.svg";
import { ReactComponent as PullRequests } from "./git-pull-request.svg";
import styles from "./GitHubRepositoryWidget.module.scss";
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

export function GitHubRepositoryWidget({ widget }: { widget: GitHubRepository }) {
	return (
		<article className={styles.widget} key={widget.id.name}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<a
						href={`repository/${widget.id.organization}/${widget.id.name}`}
						title={`${widget.id.organization}/${widget.id.name}`}
					>
						{widget.id.organization}/{widget.id.name}
					</a>
				</h2>
				{widget.private ? <Lock /> : <Unlock />}
			</header>
			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
					{widget.hasWorkflows && <div>{widget.isLastWorkflowSuccess ? <Check /> : <Error />}</div>}
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
	);
}
