// Importa a função test do Playwright.
// Ela é usada para definir casos de teste.
import { test } from '@playwright/test';

// Importa as classes que representam as páginas
// seguindo o padrão Page Object Model (POM).
import { HomePage } from '../pages/home.Page';
import { ProductPage } from '../pages/product.Page';

// Define um caso de teste com uma descrição clara.
// Essa descrição aparece no relatório de execução.
test('Deve adicionar o livro correto ao carrinho', async ({ page }) => {

  // Cria instância da HomePage passando a página atual do navegador.
  const home = new HomePage(page);

  // Cria instância da ProductPage usando a mesma página.
  const product = new ProductPage(page);

  // Acessa a página inicial da Amazon.
  await home.go();

  // Realiza a busca pelo livro específico.
  await home.searchBook('AI Engineering: Building Applications with Foundation Models');

  // Abre o livro encontrado na lista de resultados.
  await product.openBookByTitle();

  // Valida se os detalhes do livro estão corretos
  // (autor, idioma, formato e condição).
  await product.validateBookDetails();

  // Adiciona o livro ao carrinho.
  await product.addToCart();

  // Valida se a mensagem de confirmação foi exibida.
  await product.validateCartMessage();
});
