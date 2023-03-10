import { LocalStorageRepositoryWidgetRepository } from "./infrastructure/LocalStorageRepositoryWidgetRepository";
import { Router } from "./Router";
import { RepositoryWidgetContextProvider } from "./sections/dashboard/repositoryWidget/RepositoryWidgetContextProvider";

const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export function App() {
	return (
		<RepositoryWidgetContextProvider repository={repositoryWidgetRepository}>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
