import { faker } from "@faker-js/faker";

import { RepositoryWidget } from "../src/domain/RepositoryWidget";

export class RepositoryWidgetMother {
	static create(params?: Partial<RepositoryWidget>): RepositoryWidget {
		const defaultParams: RepositoryWidget = {
			id: faker.datatype.uuid(),
			url: faker.internet.url(),
			...params,
		};

		return defaultParams;
	}
}