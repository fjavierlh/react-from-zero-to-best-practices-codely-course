import { RepositoryAlreadyExistsError } from "../../../domain/RepositoryAlreadyExistsError";
import { RepositoryUrlIsNotGitHubDomainError } from "../../../domain/RepositoryUrlIsNotGitHubDomain";
import { RepositoryURLisNotValidError } from "../../../domain/RepositoryURLisNotValidError";
import { RepositoryWidget } from "../../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../../domain/RepositoryWidgetRepository";

export type AddRepositoryWidgetFormErrors = {
	hasAlreadyExistsError?: boolean;
	isNotValidURLError?: boolean;
	isNotGitHubDomain?: boolean;
};

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
	add: (repositoryWidget: RepositoryWidget) => Promise<AddRepositoryWidgetFormErrors>;
} {
	return {
		add: async (repositoryWidget: RepositoryWidget): Promise<AddRepositoryWidgetFormErrors> => {
			let url: URL;
			const initialErrors: AddRepositoryWidgetFormErrors = {
				hasAlreadyExistsError: false,
				isNotValidURLError: false,
				isNotGitHubDomain: false,
			};

			try {
				url = new URL(repositoryWidget.url);
			} catch {
				return {
					...initialErrors,
					isNotValidURLError: !!new RepositoryURLisNotValidError(repositoryWidget.url),
				};
			}

			if (!url.hostname.includes("github")) {
				return {
					...initialErrors,
					isNotGitHubDomain: !!new RepositoryUrlIsNotGitHubDomainError(repositoryWidget.url),
				};
			}

			const widgetRepositories = await repository.search();

			if (widgetRepositories.some((widget) => widget.url === repositoryWidget.url)) {
				return {
					...initialErrors,
					hasAlreadyExistsError: !!new RepositoryAlreadyExistsError(repositoryWidget.url),
				};
			}

			await repository.persist(repositoryWidget);
			document.dispatchEvent(new CustomEvent("repositoryWidgetAdded"));

			return initialErrors;
		},
	};
}
