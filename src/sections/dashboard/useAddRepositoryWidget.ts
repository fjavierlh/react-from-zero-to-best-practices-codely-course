import { RepositoryAlreadyExistsError } from "../../domain/RepositoryAlreadyExistsError";
import { RepositoryURLisNotValidError } from "../../domain/RepositoryURLisNotValidError";
import { RepositoryWidget } from "./../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "./../../domain/RepositoryWidgetRepository";

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
	add: (repositoryWidget: RepositoryWidget) => Promise<RepositoryAlreadyExistsError | void>;
} {
	return {
		add: async (
			repositoryWidget: RepositoryWidget
		): Promise<RepositoryAlreadyExistsError | RepositoryURLisNotValidError | void> => {
			try {
				new URL(repositoryWidget.url);
			} catch {
				return new RepositoryURLisNotValidError(repositoryWidget.url);
			}

			const widgetRepositories = await repository.search();

			if (widgetRepositories.some((widget) => widget.url === repositoryWidget.url)) {
				return new RepositoryAlreadyExistsError(repositoryWidget.url);
			}

			await repository.persist(repositoryWidget);
		},
	};
}
