import { RepositoryWidget } from "../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "./../domain/RepositoryWidgetRepository";

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
	async persist(repositoryWidget: RepositoryWidget): Promise<void> {
		await Promise.resolve();
	}

	async search(): Promise<RepositoryWidget[]> {
		return await Promise.resolve([]);
	}
}
