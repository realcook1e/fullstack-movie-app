describe("first testt", () => {
	it("Visit main page", () => {
		cy.visit("http://localhost:5173");
		cy.contains("Вход").click();

		cy.url().should("include", "/login");
		cy.get('input[name="username"]').type("fake@email.com");
		cy.get('input[name="username"]').should("have.value", "fake@email.com");

		cy.get('input[name="username"]').clear();
		cy.get('input[name="username"]').type("admin");
		cy.get('input[name="password"]').type("123");

		cy.request("POST", "http://localhost:5000/api/auth/login", {
			username: "admin",
			password: "123",
		})
			.its("body")
			.as("currentUser");
	});
});
