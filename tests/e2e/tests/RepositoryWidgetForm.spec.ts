import { RepositoryWidgetMother } from "../../RepositoryWidgetMother";

describe("Repository Widget Form", () => {
	it("Add new repository widget with id and url", () => {
		const newRepositoryWidget = RepositoryWidgetMother.create({
			url: "https://github.com/CodelyTV/DevDash",
		});

		cy.visit("/");

		cy.findByRole("button", { name: new RegExp("Añadir repositorio", "i") }).click();

		cy.findByLabelText(/Id/i).type(newRepositoryWidget.id);
		cy.findByLabelText(/Url del repositorio/i).type(newRepositoryWidget.url);
		cy.findByRole("button", { name: /Añadir/i }).click();

		const expectedWidget = cy.findByText("CodelyTV/DevDash");
		expectedWidget.should("exist");
	});

	it("Show error when add duplicated repository", () => {
		const newRepositoryWidget = RepositoryWidgetMother.create({
			url: "https://github.com/CodelyTV/DevDash",
		});

		cy.visit("/");

		cy.findByRole("button", { name: new RegExp("Añadir repositorio", "i") }).click();

		cy.findByLabelText(/Id/i).type(newRepositoryWidget.id);
		cy.findByLabelText(/Url del repositorio/i).type(newRepositoryWidget.url);
		cy.findByRole("button", { name: /Añadir/i }).click();

		cy.findByRole("button", { name: new RegExp("Añadir repositorio", "i") }).click();

		cy.findByLabelText(/Id/i).type(newRepositoryWidget.id);
		cy.findByLabelText(/Url del repositorio/i).type(newRepositoryWidget.url);
		cy.findByRole("button", { name: /Añadir/i }).click();

		const expectedErrorMessage = cy.findByText("Repositorio duplicado");
		expectedErrorMessage.should("exist");
	});
});
