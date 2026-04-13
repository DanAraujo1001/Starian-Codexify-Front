# Git & Commit Standards - Code Review AI Analyzer

## 📝 Pattern: Conventional Commits

Todas as mensagens de commit devem seguir rigorosamente a estrutura: `<tipo>(escopo): descrição curta`

### Tipos Permitidos:

- **feat:** Nova funcionalidade (ex: integração com API do GitHub, cálculo de score).
- **fix:** Correção de bugs no processamento de código ou na interface.
- **docs:** Alterações em documentação ou arquivos de diretrizes (.md).
- **style:** Ajustes visuais (Tailwind, CSS) que não alteram a lógica de análise.
- **refactor:** Refatoração de lógica de análise ou limpeza de componentes React.
- **perf:** Melhorias no tempo de resposta da análise de código.
- **test:** Criação ou ajuste de testes unitários e de integração.
- **chore:** Atualizações de dependências, configurações de CI/CD ou ambiente.

### Regras de Escrita:

1. **Idioma:** Português.
2. **Caixa Baixa:** A descrição após os dois pontos deve ser sempre em minúsculas.
3. **Tempo Verbal:** Use o imperativo (ex: "adiciona", "corrige", "ajusta").
4. **Objetividade:** O assunto deve ter no máximo 50 caracteres.
5. **Sem Ponto Final:** Não utilize ponto ao final da frase de commit.

## 📂 Escopos Comuns (AI Analyzer):

- `ai`: Lógica relacionada a prompts e integração com LLMs.
- `analysis`: Regras de negócio para cálculo da nota (score) e análise de código.
- `dashboard`: Telas principais e visualização de resultados.
- `forms`: Formulários de cadastro de novos projetos e configurações.
- `charts`: Implementação e ajustes no Gauge Chart e outras visualizações.
- `api`: Rotas de backend e integração com plataformas de Git (GitHub/GitLab).
- `ui`: Componentes atômicos do Design System (botões, inputs, cards).

## 💡 Exemplos:

- `feat(ai): integra análise de risco com modelo claude-3-sonnet`
- `fix(analysis): corrige peso do critério de complexidade ciclomática`
- `style(charts): aplica cores de status (critical/excellent) no gauge chart`
- `feat(forms): adiciona validação de url para repositórios privados`
- `chore(deps): atualiza bibliotecas do tailwind e lucide-react`
