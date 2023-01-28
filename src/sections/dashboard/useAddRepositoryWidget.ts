import { RepositoryWidget } from "./../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "./../../domain/RepositoryWidgetRepository";

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
	add: (repositoryWidget: RepositoryWidget) => Promise<void>;
} {
	return {
		add: async (repositoryWidget: RepositoryWidget) => {
			await repository.persist(repositoryWidget);
		},
	};
}
