import Skeleton from "react-loading-skeleton";

import styles from "./GitHubRepositoryDetail.module.scss";

export function DetailSkeleton() {
	// TODO: Implements skeletons elements and style it
	return (
		<section className={styles["repository-detail"]}>
			<header className={styles.header} style={{ height: "61px" }}>
				<Skeleton baseColor="#3CFF64" highlightColor="#D1FFDA" width="70%" />
			</header>

			<p>
				<Skeleton baseColor="#3CFF64" highlightColor="#D1FFDA" width="70%" />
			</p>

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
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>

			<h3>Workflow runs status</h3>
			<p>⏱️Last workflow run: </p>
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
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</section>
	);
}
