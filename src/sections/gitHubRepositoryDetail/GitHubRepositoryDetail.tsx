import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { GitHubRepositoryPullRequestRepository } from "../../domain/GitHubRepositoryPullRequestRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { ReactComponent as Lock } from "./../../assets/svgs/lock.svg";
import { ReactComponent as Unlock } from "./../../assets/svgs/unlock.svg";
import { DetailSkeleton } from "./DetailSkeleton";
import styles from "./GitHubRepositoryDetail.module.scss";
import { PullRequests } from "./PullRequests";
import { useGitHubRepository } from "./useGItHubRepository";
import { useInViewport } from "./useInViewport";

export function GitHubRepositoryDetail({
	gitHubRepositoryRepository,
	gitHubRepositoryPullRequestsRepository,
}: {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	gitHubRepositoryPullRequestsRepository: GitHubRepositoryPullRequestRepository;
}) {
	const { isInViewport, ref } = useInViewport();
	const { organization, name } = useParams() as { organization: string; name: string };

	const repositoryId = useMemo(() => ({ name, organization }), [name, organization]);

	const { gitHubRepository, isLoading } = useGitHubRepository(
		gitHubRepositoryRepository,
		repositoryId
	);

	if (isLoading) {
		return <DetailSkeleton />;
	}

	if (!gitHubRepository) {
		return <span>No existe este repositorio</span>;
	}

	return (
		<section className={styles["repository-detail"]}>
			<header className={styles.header}>
				<a href={gitHubRepository.url} target="_blank" rel="noreferrer">
					<h2 className={styles.header__title}>
						{gitHubRepository.id.organization}/{gitHubRepository.id.name}
					</h2>
				</a>
				{gitHubRepository.private ? <Lock /> : <Unlock />}
			</header>

			<p>{gitHubRepository.description}</p>

			<h3>Repository stats</h3>
			<table className={styles.detail__table}>
				<thead>
					<tr>
						<th>Stars</th>
						<th>Watchers</th>
						<th>Forks</th>
						<th>Issues</th>
						<th>Pull Requests</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>{gitHubRepository.stars}</td>
						<td>{gitHubRepository.watchers}</td>
						<td>{gitHubRepository.forks}</td>
						<td>{gitHubRepository.issues}</td>
						<td>{gitHubRepository.pullRequests}</td>
					</tr>
				</tbody>
			</table>

			<h3>Workflow runs status</h3>
			{gitHubRepository.workflowRunsStatus.length > 0 ? (
				<>
					<p>
						⏱️Last workflow run:{" "}
						{gitHubRepository.workflowRunsStatus[0].createdAt.toLocaleDateString("es-ES")}
					</p>
					<table className={styles.detail__table}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Title</th>
								<th>Date</th>
								<th>Status</th>
								<th>Conclusion</th>
							</tr>
						</thead>
						<tbody>
							{gitHubRepository.workflowRunsStatus.map((run) => (
								<tr key={run.id}>
									<td>{run.name}</td>
									<td>
										<a href={run.url} target="_blank" rel="noreferrer">
											{run.title}
										</a>
									</td>
									<td>{run.createdAt.toLocaleDateString("es-ES")}</td>
									<td>{run.status}</td>
									<td>{run.conclusion}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<>
					<section ref={ref}>
						{isInViewport && (
							<PullRequests
								repository={gitHubRepositoryPullRequestsRepository}
								repositoryId={repositoryId}
							/>
						)}
					</section>
				</>
			)}
		</section>
	);
}
