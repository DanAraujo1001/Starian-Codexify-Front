# Coding Standards — Starian Codexify Frontend

## 📁 Estrutura de Pastas

```
src/
├── assets/              # Imagens, ícones, fontes
├── components/
│   ├── ui/              # Componentes base (Shadcn/ui customizados)
│   └── shared/          # Componentes reutilizáveis globais (Header, Sidebar...)
├── features/            # Módulos organizados por funcionalidade
│   ├── auth/            # Login, cadastro, sessão
│   ├── projects/        # Cadastro e listagem de projetos
│   ├── rules/           # Gestão de regras de negócio (Crítica, Razoável, Aceitável)
│   └── analysis/        # Visualização de análises e feedback de MRs
├── hooks/               # Custom hooks globais
├── layouts/             # Layouts de página (AuthLayout, DashboardLayout)
├── pages/               # Páginas mapeadas para rotas
├── services/            # Chamadas HTTP (Axios)
├── types/               # Tipos e interfaces globais
└── utils/               # Funções utilitárias puras
```

Cada `feature/` pode ter sua própria estrutura interna:
```
features/projects/
├── components/          # Componentes específicos da feature
├── hooks/               # Hooks da feature
├── services/            # Chamadas de API da feature
└── types.ts             # Tipos locais da feature
```

---

## 🏷️ Nomenclatura

| Elemento               | Padrão           | Exemplo                          |
|------------------------|------------------|----------------------------------|
| Arquivo de componente  | PascalCase       | `MergeCard.tsx`                  |
| Arquivo de hook        | camelCase        | `useProjectList.ts`              |
| Arquivo de serviço     | camelCase        | `analysisService.ts`             |
| Arquivo de tipo        | camelCase        | `project.types.ts`               |
| Variáveis e funções    | camelCase        | `fetchAnalysis`, `isLoading`     |
| Constantes globais     | UPPER_SNAKE_CASE | `MAX_PROJECTS`, `API_BASE_URL`   |
| Interfaces e Types     | PascalCase       | `ProjectData`, `AnalysisResult`  |
| Enums                  | PascalCase       | `AnalysisStatus.Critical`        |

---

## 🧩 Componentes

Sempre usar **arrow functions**:

```tsx
// ✅ correto
const MergeCard = ({ title, score }: MergeCardProps) => {
  return <div>...</div>
}

export default MergeCard

// ❌ evitar
function MergeCard() { ... }
```

Props sempre tipadas com `interface` ou `type`:

```tsx
interface MergeCardProps {
  title: string
  score: number
  status: 'critical' | 'warning' | 'approved'
}
```

### Regras Gerais:
- Um componente por arquivo
- Componentes sem lógica de negócio — extrair em hooks customizados
- Máximo de 200 linhas por componente — quebrar em sub-componentes se necessário

---

## 🔷 TypeScript

1. **Proibido** o uso de `any` sem comentário explicativo justificando
2. **Preferir** `unknown` + type guard quando o tipo não for conhecido
3. **Tipar** retorno de funções quando não for inferível de forma óbvia
4. **Usar** `type` para uniões/intersecções e `interface` para objetos extensíveis
5. **Centralizar** tipos de resposta de API em `@/types/` ou em `features/*/types.ts`

---

## 📦 Imports

Usar absolute imports com alias `@/`:

```ts
// ✅ correto
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/hooks/useAuth'

// ❌ evitar
import { Button } from '../../../components/ui/Button'
```

### Ordem de imports (seguir essa sequência):
1. Libs externas (`react`, `react-router-dom`, `axios`...)
2. Componentes e hooks internos
3. Tipos
4. Assets

---

## 🎨 Estilização com Tailwind

- Toda estilização via classes Tailwind — sem `style={{}}` inline
- Classes condicionais com `cn` (utilitário do Shadcn):

```tsx
<div className={cn('rounded p-4', isActive && 'bg-blue-500')} />
```

- Responsividade obrigatória em todas as telas: usar prefixos `sm:`, `md:`, `lg:`
- Paleta de cores e design system: **Clean/Modern** conforme definido no Figma

---

## 📊 Regras de Negócio Refletidas na UI

Estas regras do backlog devem ser respeitadas na construção dos componentes:

- `score <= 50` → exibir badge **"Alerta Crítico"** 🔴 destacado no card da análise (RF014, RD004)
- `score <= 80` → exibir arquivo e linha exata da violação (RF016)
- `score > 80` → exibir seção colapsável com sugestões de melhoria (RF017)
- Exclusão de projeto → sempre exibir modal de confirmação antes de deletar (RF019)
- Categorias de regra → usar cores consistentes: Crítica 🔴, Razoável 🟡, Aceitável 🟢

---

## ✅ Boas Práticas Gerais

1. **Sem console.log** em código commitado
2. **Sem TODO** sem issue/task associada
3. **Tratar** estados de loading, erro e vazio em toda listagem ou fetch de dados
4. **Mocks** de desenvolvimento ficam em `@/mocks/` e são removidos antes do merge para `main`
5. **Funções utilitárias** puras ficam em `@/utils/`, nunca dentro de componentes
6. **Credenciais** nunca hardcodadas — usar variáveis de ambiente via `.env`
