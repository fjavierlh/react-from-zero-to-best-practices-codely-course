import { RepositoryId } from "./GitHubRepository";
import { RepositoryWidget } from "./RepositoryWidget";

export interface RepositoryWidgetRepository {
	persist(repositoryWidget: RepositoryWidget): Promise<void>;
	search(repositoryId: RepositoryId): Promise<RepositoryWidget[]>;
}
