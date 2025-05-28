describe('Formulario Diario', () => {
  it('Carga el formulario', () => {
    cy.visit("/formulario");
    cy.contains("Datos diarios");
    cy.get("input[name='colaborador_id']").should("exist");
    cy.get("input[name='fecha']").should("exist");
  });

  it('Valida campos requeridos', () => {
    cy.contains("Enviar Reporte", { timeout: 10000 }).click();
    cy.contains("Requerido"); 
  });

  it('Envía datos válidos', () => {
    cy.get("input[name='colaborador_id']").type("1");
    cy.get("input[name='fecha']").type("2025-05-01");
    cy.get("select[name='galera_id']").select("1");
    cy.get("input[name='mortalidad_hembra']").clear().type("2");
    cy.get("input[name='mortalidad_macho']").clear().type("3");
    cy.get("input[name='consumo_alimento']").clear().type("50");
    cy.get("input[name='huevo_fertil']").clear().type("10");
    cy.get("input[name='huevo_pequeno']").clear().type("5");
    cy.get("input[name='huevo_mediano']").clear().type("8");
    cy.get("input[name='huevo_grande']").clear().type("6");
    cy.get("input[name='huevo_jumbo']").clear().type("2");
    cy.contains("Enviar Reporte").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Reporte enviado correctamente");
    });
  });
});
