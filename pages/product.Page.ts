// Importa Page (controle da aba do navegador)
// e expect (usado para fazer validações/assertions nos testes)
import { Page, expect } from '@playwright/test';

// Classe seguindo o padrão Page Object Model (POM).
// Ela representa a página de detalhes de um produto.
export class ProductPage {

  // Recebe a instância da página do Playwright
  // e armazena como propriedade privada da classe.
  constructor(private page: Page) {}

  // Método responsável por abrir o livro específico pelo título.
  async openBookByTitle() {

    // Cria um locator usando XPath.
    // Ele procura um <h2> que contenha um <span> com o texto do livro,
    // depois sobe até o elemento <a> (link) que envolve esse título.
    const bookLink = this.page.locator(
      `//h2[.//span[contains(text(),"AI Engineering: Building Applications with Foundation Models")]]/ancestor::a`
    );

    // Aguarda o primeiro resultado ficar visível na página.
    // first() é usado caso haja múltiplos resultados.
    await bookLink.first().waitFor({ state: 'visible' });

    // Clica no primeiro link encontrado.
    await bookLink.first().click();
  }

  async validateBookDetails() {

    // ==============================
    // Validação do Autor
    // ==============================

    // Localiza o autor dentro do card "Seguir o autor".
    // Usa parte do href para identificar corretamente.
    const author = this.page.locator('a[href*="Chip-Huyen"] span.a-truncate-full');

    // Espera o elemento aparecer no DOM.
    await author.waitFor();

    // Valida se o texto do elemento é exatamente "Chip Huyen".
    await expect(author).toHaveText('Chip Huyen');

    // ==============================
    // Validação do Idioma
    // ==============================

    // Seleciona o valor do idioma na seção de atributos do produto.
    const language = this.page.locator('#rpi-attribute-language .rpi-attribute-value');

    await language.waitFor();

    // Verifica se o idioma exibido é "Inglês".
    await expect(language).toHaveText('Inglês');

    // ==============================
    // Validação do Formato (Capa comum)
    // ==============================

    // Procura o botão da versão PAPERBACK que esteja selecionado.
    // Usa dois possíveis seletores para maior tolerância.
    const paperback = this.page.locator(
      '#tmm-grid-swatch-PAPERBACK[aria-checked="true"], #tmm-grid-swatch-PAPERBACK .a-button-selected'
    );

    await paperback.waitFor();

    // Verifica se contém o texto "Capa Comum".
    await expect(paperback).toContainText('Capa Comum');

    // ==============================
    // Validação da Condição (Novo)
    // ==============================

    // Seleciona possíveis áreas onde aparece a condição do produto.
    // Inclui body como fallback para garantir que o texto esteja presente.
    const condition = this.page.locator('#buyNewSection, #newBuyBoxPrice, body');

    // Verifica se a palavra "Novo" aparece.
    await expect(condition).toContainText('Novo');
  }

  // Método responsável por adicionar o produto ao carrinho.
  async addToCart() {
    // Clica no botão padrão da Amazon para adicionar ao carrinho.
    await this.page.locator('#add-to-cart-button').click();
  }

  // Valida se a mensagem de confirmação apareceu após adicionar.
  async validateCartMessage() {

    // Verifica se a página contém o texto de confirmação.
    await expect(this.page.locator('body')).toContainText('Adicionado ao carrinho');
  }
}
