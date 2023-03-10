import { RepositoryWidget } from "../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "./../domain/RepositoryWidgetRepository";

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
	localStorageKey = "repositoryWidgets";

	async persist(repositoryWidget: RepositoryWidget): Promise<void> {
		await Promise.resolve();
	}

	async search(): Promise<RepositoryWidget[]> {
		const data = localStorage.getItem(this.localStorageKey);

		if (!data) {
			return Promise.resolve([]);
		}

		return Promise.resolve(JSON.parse(data) as RepositoryWidget[]);
	}
}
