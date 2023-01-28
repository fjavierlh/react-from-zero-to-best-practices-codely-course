import { RepositoryWidget } from "./RepositoryWidget";

export interface RepositoryWidgetRepository {
	persist(repositoryWidget: RepositoryWidget): Promise<void>;
}
