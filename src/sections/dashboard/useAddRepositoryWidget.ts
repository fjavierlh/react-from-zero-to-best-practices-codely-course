import { RepositoryAlreadyExistsError } from "../../domain/RepositoryAlreadyExistsError";
import { RepositoryWidget } from "./../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "./../../domain/RepositoryWidgetRepository";

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
	add: (repositoryWidget: RepositoryWidget) => Promise<RepositoryAlreadyExistsError | void>;
} {
	return {
		add: async (
			repositoryWidget: RepositoryWidget
		): Promise<RepositoryAlreadyExistsError | void> => {
			const widgetRepositories = await repository.search();

			if (widgetRepositories.some((widget) => widget.url === repositoryWidget.url)) {
				return new RepositoryAlreadyExistsError(repositoryWidget.url);
			}

			await repository.persist(repositoryWidget);
		},
	};
}
