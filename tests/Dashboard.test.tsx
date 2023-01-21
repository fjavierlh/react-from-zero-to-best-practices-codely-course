import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { GitHubRepositoryRepository } from "./../src/domain/GitHubRepositoryRepository";
import { GitHubRepositoryMother } from "./GitHubRepositoryMother";

const mockReposiroty = mock<GitHubRepositoryRepository>();

describe("Dashboard", () => {
	const gitHubRepository = GitHubRepositoryMother.create();

	it("show all widgets", async () => {
		mockReposiroty.search.mockResolvedValue([gitHubRepository]);

		render(<Dashboard repository={mockReposiroty} />);

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(firstWidgetHeader).toBeInTheDocument();
	});

	it("show not results message when there are no widgets", async () => {
		mockReposiroty.search.mockResolvedValue([]);

		render(<Dashboard repository={mockReposiroty} />);

		const emptyMessage = await screen.findByText(new RegExp("No hay widgets configurados", "i"));
		expect(emptyMessage).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });

		mockReposiroty.search.mockResolvedValue([gitHubRepository]);

		render(<Dashboard repository={mockReposiroty} />);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
