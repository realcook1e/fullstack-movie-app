describe("first testt", () => {
	it("Visit main page", () => {
		cy.visit("http://localhost:5173");
		cy.contains("Вход").click();
		cy.get('input[name="username"]').type("admin");
		cy.get('input[name="password"]').type("admin");
		cy.contains("Войти").click();

		cy.contains("Форрест Гамп").click();
		cy.get("textarea").type("новый комментарий");
		cy.contains("Отправить").click();
	});
});
