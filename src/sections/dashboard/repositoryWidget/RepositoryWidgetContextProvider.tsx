import { createContext, useContext, useEffect, useState } from "react";

import { config } from "../../../devdash_config";
import { RepositoryWidget } from "../../../domain/RepositoryWidget";

const RepositoryWidgetContext = createContext<{ repositoryWidgets: RepositoryWidget[] }>({
	repositoryWidgets: [],
});

export function RepositoryWidgetContextProvider({
	children,
}: {
	children: React.ReactElement | React.ReactElement[];
}) {
	const [repositoryWidgets, setRepositoryWidgets] = useState<RepositoryWidget[]>([]);

	useEffect(() => {
		setRepositoryWidgets(
			config.widgets.map((widget) => ({ id: widget.id, url: widget.repository_url }))
		);
	}, []);

	return (
		<RepositoryWidgetContext.Provider value={{ repositoryWidgets }}>
			{children}
		</RepositoryWidgetContext.Provider>
	);
}

export const useRepositoryWidgetContext = () => useContext(RepositoryWidgetContext);
