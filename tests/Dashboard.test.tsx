import { screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { RepositoryWidgetRepository } from "../src/domain/RepositoryWidgetRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { GitHubRepositoryRepository } from "./../src/domain/GitHubRepositoryRepository";
import { GitHubRepositoryMother } from "./GitHubRepositoryMother";
import { renderWithRouter } from "./renderWithRouter";

const mockGitHubRepositoryRepository = mock<GitHubRepositoryRepository>();
const mockRepositoryWidgetRepository = mock<RepositoryWidgetRepository>();

describe("Dashboard", () => {
	const gitHubRepository = GitHubRepositoryMother.create();

	it("show all widgets", async () => {
		mockGitHubRepositoryRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(
			<Dashboard
				gitHubRepositoryRepository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockRepositoryWidgetRepository}
			/>
		);

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(firstWidgetHeader).toBeInTheDocument();
	});

	it("show not results message when there are no widgets", async () => {
		mockGitHubRepositoryRepository.search.mockResolvedValue([]);

		renderWithRouter(
			<Dashboard
				gitHubRepositoryRepository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockRepositoryWidgetRepository}
			/>
		);

		const emptyMessage = await screen.findByText(new RegExp("No hay widgets configurados", "i"));
		expect(emptyMessage).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });

		mockGitHubRepositoryRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(
			<Dashboard
				gitHubRepositoryRepository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockRepositoryWidgetRepository}
			/>
		);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
