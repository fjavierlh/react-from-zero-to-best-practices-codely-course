import { RepositoryAlreadyExistsError } from "./RepositoryAlreadyExistsError";
import { RepositoryWidget } from "./RepositoryWidget";

export interface RepositoryWidgetRepository {
	persist(repositoryWidget: RepositoryWidget): Promise<RepositoryAlreadyExistsError | void>;
	search(): Promise<RepositoryWidget[]>;
}
