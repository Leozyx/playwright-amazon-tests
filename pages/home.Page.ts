// Importa o tipo Page da biblioteca do Playwright.
// O Page representa uma aba do navegador que será automatizada.
import { Page } from '@playwright/test';

// Criação da classe HomePage seguindo o padrão Page Object Model (POM).
// Esse padrão organiza ações da página dentro de uma classe,
// facilitando manutenção e reutilização do código.
export class HomePage {

  // O construtor recebe uma instância da página do Playwright.
  // O "private page: Page" cria automaticamente uma propriedade privada
  // chamada "page" e atribui o valor recebido.
  constructor(private page: Page) {}

  // Método responsável por acessar a página inicial da Amazon.
  async go() {
    // O método goto navega até a URL informada.
    // O "await" garante que o código espere o carregamento da página
    // antes de continuar a execução.
    await this.page.goto('https://www.amazon.com.br/');
  }

  // Método responsável por realizar uma busca de livro pelo nome.
  async searchBook(name: string) {

    // Localiza o campo de busca usando o placeholder do input.
    // Depois preenche o campo com o nome recebido como parâmetro.
    await this.page.getByPlaceholder('Pesquisar Amazon.com.br').fill(name);

    // Simula o pressionamento da tecla Enter para executar a busca.
    // Usa o teclado virtual do Playwright.
    await this.page.keyboard.press('Enter');
  }
}
