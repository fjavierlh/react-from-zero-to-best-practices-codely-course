import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mock from "jest-mock-extended/lib/Mock";

import { RepositoryWidget } from "../../../src/domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../../src/domain/RepositoryWidgetRepository";
import { AddRepositoryWidgetForm } from "../../../src/sections/dashboard/AddRepositoryWidgetForm";

const mockRepositoryWidget = mock<RepositoryWidgetRepository>();

describe("AddRepositoryWidgetForm", () => {
	test("show widget form when add button is clicked", async () => {
		render(<AddRepositoryWidgetForm repositoryWidget={mockRepositoryWidget} />);

		const button = await screen.findByRole("button", { name: new RegExp("Añadir", "i") });

		userEvent.click(button);

		const urlLabel = screen.getByLabelText(new RegExp("Url del repositorio", "i"));

		expect(urlLabel).toBeInTheDocument();
	});

	test("add new widget when form is submitted", async () => {
		mockRepositoryWidget.search.mockResolvedValue([]);
		const newRepositoryWidget: RepositoryWidget = {
			id: "someId",
			url: "https://github.com/some-repo",
		};

		render(<AddRepositoryWidgetForm repositoryWidget={mockRepositoryWidget} />);

		const addNewWidgetButton = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		userEvent.click(addNewWidgetButton);

		const id = screen.getByLabelText(/Id/i);
		userEvent.type(id, newRepositoryWidget.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(url, newRepositoryWidget.url);

		const submitButton = await screen.findByRole("button", { name: /Añadir/i });
		userEvent.click(submitButton);

		const addAnotherNewWidgetButton = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		expect(addAnotherNewWidgetButton).toBeInTheDocument();
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(mockRepositoryWidget.persist).toHaveBeenCalledWith(newRepositoryWidget);

		mockRepositoryWidget.persist.mockReset();
		mockRepositoryWidget.search.mockClear();
	});

	test("show error when repository already exists in dashboard", async () => {
		const existingRepositoryWidget: RepositoryWidget = {
			id: "existingRepositoryWidgetId",
			url: "https://github.com/existing-repo",
		};
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		mockRepositoryWidget.search.mockResolvedValue([existingRepositoryWidget]);

		render(<AddRepositoryWidgetForm repositoryWidget={mockRepositoryWidget} />);

		const addWidgetButton = await screen.findByRole("button", { name: /Añadir repositorio/i });

		userEvent.click(addWidgetButton);

		const idInput = screen.getByLabelText(/Id/i);
		userEvent.type(idInput, existingRepositoryWidget.id);

		const urlInput = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(urlInput, existingRepositoryWidget.url);

		const submitButton = await screen.findByRole("button", { name: /Añadir/i });
		userEvent.click(submitButton);

		const errorMessage = await screen.findByRole("alert", {
			description: /Repositorio duplicado/i,
		});

		expect(errorMessage).toBeInTheDocument();
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(mockRepositoryWidget.persist).not.toHaveBeenCalled();

		mockRepositoryWidget.search.mockReset();
	});

	test("url repository input must be an url", async () => {
		const widgetWithoutUrl: RepositoryWidget = {
			id: "some-id",
			url: "Esto no es una url",
		};

		render(<AddRepositoryWidgetForm repositoryWidget={mockRepositoryWidget} />);

		const addWidgetButton = await screen.findByRole("button", { name: /Añadir repositorio/i });

		userEvent.click(addWidgetButton);

		const idInput = screen.getByLabelText(/Id/i);
		userEvent.type(idInput, widgetWithoutUrl.id);

		const urlInput = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(urlInput, widgetWithoutUrl.url);

		const submitButton = await screen.findByRole("button", { name: /Añadir/i });
		userEvent.click(submitButton);

		const errorMessage = await screen.findByRole("alert", {
			description: /Introduce una url válida/i,
		});

		expect(errorMessage).toBeInTheDocument();
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(mockRepositoryWidget.persist).not.toHaveBeenCalled();
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(mockRepositoryWidget.search).not.toHaveBeenCalled();
	});
});
