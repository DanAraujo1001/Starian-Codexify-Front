# UI/UX Guidelines - Code Review AI Analyzer

## 🎨 Design Tokens (Synced with Figma)

### 🌓 Theme Strategy

- Suporte nativo a **Light** e **Dark Mode**.
- No Tailwind, usar as variáveis de cores configuradas no `tailwind.config.js`.

### 🌈 Color Palette

| Token             | Light Mode (RGBA) | Dark Mode (RGBA) | Usage                                |
| :---------------- | :---------------- | :--------------- | :----------------------------------- |
| `brand-primary`   | 30, 58, 138, 1    | 30, 58, 138, 1   | Cor principal / Call to Action       |
| `surface-primary` | 240, 240, 240, 1  | 17, 24, 39, 1    | Background principal das telas       |
| `text-primary`    | 17, 24, 39, 1     | 255, 255, 255, 1 | Títulos e corpo principal            |
| `text-secondary`  | 107, 114, 128, 1  | 156, 163, 175, 1 | Textos de apoio e labels             |
| `critical`        | 251, 44, 54, 1    | 251, 44, 54, 1   | Erros e notas baixas (Score < 50)    |
| `medium`          | 240, 177, 0, 1    | 240, 177, 0, 1   | Alertas e notas médias (Score 50-75) |
| `excellent`       | 0, 201, 80, 1     | 0, 201, 80, 1    | Sucesso e notas altas (Score > 75)   |
| `border-default`  | 229, 231, 235, 1  | 75, 85, 99, 1    | Divisores e bordas de inputs         |

### 🔡 Typography (Inter & Fira Code)

- **Primary:** `Inter`, sans-serif (Interface)
- **Mono:** `Fira Code`, monospace (Trechos de código)

**Escala de Texto:**

- `display-lg`: 56px / Bold / Leading 64px
- `h1`: 40px / Bold / Leading 48px
- `h2`: 32px / Semibold / Leading 40px
- `body-md`: 16px / Regular / Leading 24px (Padrão)
- `caption`: 12px / Regular / Leading 16px

### 📐 Spacing & Radius

- **Base Grid:** 4px
- **Paddings Internos:** `spacing-4` (16px) ou `spacing-3` (12px).
- **Layout Margins:** `spacing-8` (32px) para cards, `spacing-16` (64px) para seções.
- **Bordas:**
  - `radius-md` (8px): Padrão para Botões, Inputs e Cards.
  - `radius-lg` (12px): Modais e Cards de destaque.
  - `radius-full`: Avatares e Badges.

## 🧩 Component Rules

1. **Forms:** Inputs devem usar `border-default`, `radius-md` e aplicar `ring-2 ring-brand-primary` no estado `:focus`.
2. **Buttons:**
   - Default: Background `brand-primary`, texto `text-brand`.
   - Hover: Mudar para `brand-hover` com `transition-colors`.
3. **Data Viz (Gauge Chart):** Utilizar as cores `critical-light`, `medium-light` e `excellent-light` para representar os níveis de pontuação do código analisado.
4. **Cards:** Background `surface-primary` com borda `border-default`.

## ⚡ Interaction & UX

- **Hover States:** Aplicar `transition-all duration-200` em elementos clicáveis.
- **Feedbacks:** Toda ação de cadastro de projeto deve retornar um Toast de sucesso/erro seguindo os tokens de cor de status.
