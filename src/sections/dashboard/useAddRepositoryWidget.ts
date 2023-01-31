import { RepositoryAlreadyExistsError } from "../../domain/RepositoryAlreadyExistsError";
import { RepositoryURLisNotValidError } from "../../domain/RepositoryURLisNotValidError";
import { RepositoryWidget } from "./../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "./../../domain/RepositoryWidgetRepository";

export type AddRepositoryWidgetErrors = {
	hasAlreadyExistsError?: boolean;
	isNotValidURLError?: boolean;
};

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
	add: (repositoryWidget: RepositoryWidget) => Promise<AddRepositoryWidgetErrors | null>;
} {
	return {
		add: async (repositoryWidget: RepositoryWidget): Promise<AddRepositoryWidgetErrors | null> => {
			try {
				new URL(repositoryWidget.url);
			} catch {
				return {
					isNotValidURLError: !!new RepositoryURLisNotValidError(repositoryWidget.url),
				};
			}

			const widgetRepositories = await repository.search();

			if (widgetRepositories.some((widget) => widget.url === repositoryWidget.url)) {
				return {
					hasAlreadyExistsError: !!new RepositoryAlreadyExistsError(repositoryWidget.url),
				};
			}

			await repository.persist(repositoryWidget);

			return null;
		},
	};
}
