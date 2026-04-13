# Tech Stack — Starian Codexify Frontend

## ⚙️ Core

| Tecnologia   | Versão     | Uso                     |
|--------------|------------|-------------------------|
| React        | 18.x       | Framework de UI         |
| TypeScript   | 5.x        | Linguagem principal     |
| Vite         | 5.x        | Bundler e dev server    |
| Tailwind CSS | 3.x        | Estilização             |

---

## 🗺️ Roteamento

- `react-router-dom v6`: roteamento client-side com `createBrowserRouter`
- Rotas protegidas via layout component (`PrivateRoute`)
- Rotas públicas: `/login`, `/register`
- Rotas privadas: `/dashboard`, `/projects`, `/projects/:id/rules`, `/projects/:id/analysis`

---

## 🗃️ Gerenciamento de Estado

- `React Context API`: estado global de autenticação e projeto ativo
- `useState / useReducer`: estado local de componentes
- **Não usar** Redux ou Zustand — não aprovado pelo squad

---

## 🌐 Requisições HTTP

- `axios`: cliente HTTP para integração com a API REST do backend
- Instância centralizada em `@/services/api.ts` com `baseURL` e interceptors
- Erros globais tratados no interceptor de resposta (401, 500, etc.)

---

## 📋 Formulários e Validação

- `react-hook-form`: gerenciamento de formulários
- `zod`: validação de schema e tipagem inferida
- `@hookform/resolvers/zod`: integração entre os dois

---

## 🧩 Componentes UI

- `shadcn/ui`: biblioteca de componentes base (Radix UI + Tailwind)
- Componentes customizados ficam em `@/components/ui/`
- **Não usar** MUI, Ant Design ou Bootstrap

---

## 🔔 Notificações e Feedback

- `sonner`: toasts de sucesso, erro e alerta
- `shadcn/ui Dialog`: modais de confirmação (ex: exclusão de projeto — RF019)

---

## 🤖 IAs e Ferramentas de Desenvolvimento

- `GitHub Copilot`: assistente de código na IDE
- `Figma + Figma Maker`: design e geração de telas
- `VS Code`: IDE principal

---

## 🔀 Versionamento

- **Git** com GitHub
- Repositório: `https://github.com/DanAraujo1001/Starian-Codexify-Front`
- Padrão de branches: `feat/`, `fix/`, `chore/`, `refactor/`
- Padrão de commits: ver `git-standards.md`

---

## 🚫 O que NÃO usar no Frontend

- **CSS Modules** ou arquivos `.css` separados — usar apenas Tailwind
- **Redux / Zustand** — não aprovado pelo squad
- **Styled Components** — não aprovado pelo squad
- **jQuery** ou manipulação direta de DOM
- **MUI, Ant Design, Bootstrap** — usar apenas Shadcn/ui
