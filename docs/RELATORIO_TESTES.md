# Etapa 4 — Relatório de Testes | Café da Claudinha (Modelo Cascata)

- **Projeto:** Site institucional “Café da Claudinha”
- **Etapa:** 4 — TESTES (requisitos congelados; nenhum requisito alterado, nenhuma funcionalidade adicionada)
- **Data:** 2026-09-04
- **Estrutura analisada:** `index.html`, `cardapio.html`, `contato.html`, `css/style.css`, `js/script.js`
- **Execução do site:** site estático; abertura direta dos arquivos HTML no navegador (sem build, sem backend)

## Tabela de resultados

| ID | Requisito | Teste realizado | Resultado esperado | Resultado obtido | Status |
|----|-----------|-----------------|--------------------|------------------|--------|
| CT01 | RF01 | Abrir `index.html` e verificar conteúdo institucional | Página apresenta informações sobre a cafeteria | Hero “Bem-vindo ao Café da Claudinha” + seção “Nossa cafeteria” + “O que servimos” visíveis (DOM e screenshot) | PASSOU |
| CT02 | RF02 | Inspecionar produtos do Cardápio (imagem, nome, descrição, preço) | Todos os produtos com os 4 elementos | 6 produtos, todos com `img` (src+alt), `h3`, `p` e `.price` | PASSOU |
| CT03 | RF03 | Abrir Contato e verificar endereço, telefone e horário | Três informações visíveis e legíveis | “Rua das Flores, 123 — Centro”, “(47) 3333-3333”, “Segunda a sábado, das 08:00 às 19:00” visíveis (DOM e screenshot 320px) | PASSOU |
| CT04 | RF04 | Form válido (Maria Silva / maria@email.com / “Gostaria de conhecer a cafeteria.”) + Enviar | Feedback visual de sucesso | `form-feedback success` :: “Mensagem enviada com sucesso!” | PASSOU |
| CT05 | RF04 | Form vazio + Enviar | Não aceitar silenciosamente; validar obrigatórios | `form-feedback error` :: “Verifique os campos destacados…” + 3 `.field-error.visible` | PASSOU |
| CT06 | RF04 | E-mail inválido (“teste”) + Enviar | Impedir/sinalizar formato inválido | `form-feedback error` + `#erro-email` visível | PASSOU |
| CT07 | RF05 | Links Início/Cardápio/Contato clicados a partir das 3 páginas (9 transições) | Todos abrem a página correta | 9/9 transições OK; todos os alvos existem; `css/style.css` e `js/script.js` resolvem | PASSOU |
| CT08 | RNF01/RNF02 | Layout desktop 1366x768 (header, nav, textos, imagens, cards, form, footer) | Utilizável, sem elementos quebrados/cortados/sobrepostos | `scrollWidth=1366 = innerWidth` nas 3 páginas; screenshot conferido | PASSOU |
| CT09 | RNF01/RNF02 | Layout mobile 390x844 (menu, largura, cards, form, footer, sem scroll horizontal) | Utilizável, sem overflow horizontal | `scrollWidth=390 = innerWidth` nas 3 páginas; cards em 1 coluna; hamburger abre/fecha (`aria-expanded` atualiza) | PASSOU |
| CT10 | RNF01/RNF02 | Layout mobile pequeno 320x568 | Interface continua utilizável | `scrollWidth=320 = innerWidth` nas 3 páginas; screenshots conferidos | PASSOU |
| CT11 | — | Console JS nas 3 páginas × 3 viewports + interações de formulário | Nenhum erro JS relevante | 0 erros em 9 carregamentos; 0 `pageerror` nas interações; `node --check` OK em `js/script.js` | PASSOU |
| CT12 | — | Carregamento de imagens, CSS e JS | Nenhum recurso essencial com erro | 0 falhas: CSS/JS locais OK + 7 imagens Unsplash (https) carregadas | PASSOU |

## 1. Resumo dos testes executados

- **Inspeção estática (22/22 verificações):** estrutura do formulário (`required` nos 3 campos,
  `type="email"`, `labels` associados, `#form-feedback`), regex de e-mail no JS, guards
  (`if (toggle && nav)`, `if (!form) return`), 4 media queries (1024/768/600/390px),
  `viewport` meta nas 3 páginas, `overflow-x: hidden`, imagens fluidas, `alt` não-vazio nas 7 imagens.
- **Browser real (12/12):** Microsoft Edge headless via `puppeteer-core`, arquivos servidos por `file://`,
  viewports 1366x768, 390x844 e 320x568. CT01–CT03 verificados no DOM renderizado; CT04–CT06 com
  digitação e clique reais; CT07 com 9 cliques de navegação; CT08–CT10 com medição
  `document.documentElement.scrollWidth <= window.innerWidth`; CT11 com captura de console/`pageerror`;
  CT12 com captura de `requestfailed`/respostas não-OK.
- **Complementar:** menu hamburger em 390px abre/fecha corretamente (evidência `menu-mobile-aberto.png`).

## 2. Requisitos aprovados

RF01, RF02, RF03, RF04, RF05, RNF01, RNF02 — todos aprovados, sem ressalvas.

## 3. Requisitos com falha

Nenhum. Não foi encontrado defeito de implementação relacionado aos requisitos congelados.

## 4. Correções realizadas

Nenhuma. Como todos os testes passaram, **nada foi alterado no projeto**
(conforme a regra: “Se todos os testes passarem: NÃO altere o projeto”).

## 5. Arquivos modificados durante a etapa de testes

- **Nenhum arquivo-fonte modificado.** `git status` confirma apenas a adição de `docs/`:
  - `docs/RELATORIO_TESTES.md` (este relatório)
  - `docs/evidencias/*.png` (10 screenshots reais, não simulados)

## 6. Testes visuais realizados

Ferramenta: **Edge headless + puppeteer-core** (browser automation real). Screenshots em
`docs/evidencias/` (viewport superior esquerdo, escala 1:1):

- `inicial-desktop.png`, `cardapio-desktop.png`, `contato-desktop.png`
- `inicial-mobile.png`, `cardapio-mobile.png`, `contato-mobile.png`
- `inicial-mobile320.png`, `cardapio-mobile320.png`, `contato-mobile320.png`
- `menu-mobile-aberto.png` (complementar: menu aberto em 390px)

Inspeção visual manual das amostras confirmou: header/nav íntegros, hero com imagem,
cards em 3→2→1 coluna conforme a largura, formulário e bloco de informações legíveis,
sem sobreposição, corte ou scroll horizontal em nenhum viewport.

## 7. Viewports testados

| Viewport | Representa | Overflow (`scrollWidth <= innerWidth`) |
|----------|-----------|----------------------------------------|
| 1366x768 | Desktop (CT08) | OK nas 3 páginas |
| 390x844 | Mobile (CT09) | OK nas 3 páginas |
| 320x568 | Mobile pequeno (CT10) | OK nas 3 páginas |

## 8. Limitações da validação

1. Páginas servidas via `file://`, não via servidor HTTP — comportamento equivalente para site
   estático, sem rotas dinâmicas.
2. Imagens externas (Unsplash) dependem de internet; no ambiente de teste estavam acessíveis
   (HTTP 200) e carregaram no browser.
3. Sem backend, o “envio” do formulário é simulado no front-end (feedback de sucesso + `reset`),
   o que é o comportamento esperado e coerente com o RF04 para este escopo.
4. Acessibilidade além do escopo (leitores de tela, contraste medido) não foi testada.

## 9. Resultado geral da Etapa 4

**APROVADO — 12/12 testes PASSOU, 0 FALHOU, 0 NÃO FOI POSSÍVEL TESTAR.**
O projeto atende a todos os requisitos congelados (RF01–RF05, RNF01–RNF02) e está
**pronto para avançar para a ETAPA 5 — IMPLANTAÇÃO**, sem correções pendentes.

### Checklist

- [x] RF01 testado
- [x] RF02 testado
- [x] RF03 testado
- [x] RF04 testado
- [x] RF05 testado
- [x] RNF01 testado
- [x] RNF02 testado
- [x] Desktop testado (ferramenta disponível: Edge headless)
- [x] Mobile testado (390px e 320px, Edge headless)
- [x] Formulário testado (válido, vazio, e-mail inválido)
- [x] Links testados (9 transições)
- [x] Console verificado (0 erros)
- [x] Recursos verificados (0 falhas)
- [x] Relatório criado (`docs/RELATORIO_TESTES.md`)
