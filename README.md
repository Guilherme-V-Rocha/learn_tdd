<div align="center">

# learn_tdd — Formulários com Validação Type-Safe

Projeto de estudo focado em **TDD aplicado a formulários complexos** com Next.js 16, React Hook Form, Zod e **mutation testing com Stryker**.

[🔗 Repositório](https://github.com/Guilherme-V-Rocha/learn_tdd) · `[Repo only — sem demo ao vivo]`

</div>

---

## 🎯 Sobre

Este projeto documenta meu estudo prático de **TDD (Test-Driven Development)** aplicado a um caso real: um formulário de cadastro de produto com validação type-safe.

A regra é simples e disciplinada: **cada regra de validação é escrita como teste antes da implementação** — fluxo vermelho → verde → refactor. Nada de testar depois; o teste conduz o design.

### Por que este projeto existe

Em 2025–2026, retomei a prática técnica com foco em **confiança via testes**. Aprender TDD só faz sentido com um problema concreto — então construí um formulário real com regras de validação não-triviais e usei o ciclo TDD para conduzir cada decisão de schema, mensagem de erro e comportamento de UI.

### Diferenciais técnicos

- ✅ **TDD puro** — testes escritos antes do código de produção em cada regra
- 🧬 **Mutation testing com Stryker 9.6** — vai além de coverage: injeta mutações no código e mede se os testes pegam. Coverage diz "este código rodou"; mutation testing diz "este código está protegido".
- 🔒 **Type-safe end-to-end** — Zod 4 como fonte única de verdade; tipos derivados do schema, não duplicados
- ⚡ **React Hook Form 7** — forms performáticos com re-render mínimo, integração nativa com Zod via `@hookform/resolvers`
- 🧪 **Tests colocalizados** — `register-product.test.tsx` ao lado de `register-product.tsx`, padrão de projeto escalável

---

## 🛠️ Stack

| Tecnologia                 | Versão  | Uso                                          |
| -------------------------- | ------- | -------------------------------------------- |
| Next.js                    | 16.2.2  | Framework e App Router                       |
| React                      | 19.2.4  | UI declarativa                               |
| TypeScript                 | ^5      | Tipagem end-to-end                           |
| Tailwind CSS               | ^4      | Estilização utilitária                       |
| React Hook Form            | ^7.75   | Forms performáticos                          |
| Zod                        | ^4.4.3  | Schemas de validação type-safe               |
| @hookform/resolvers        | ^5.2.2  | Ponte Zod ↔ React Hook Form                  |
| Jest                       | ^30.3   | Runner de testes                             |
| Testing Library (RTL)      | ^16.3   | Testes de componente acessíveis pelo DOM     |
| @testing-library/jest-dom  | ^6.9    | Matchers customizados (`toBeInTheDocument`)  |
| @testing-library/user-event| ^14.6   | Interação realista (clique, digitação)       |
| ts-jest                    | ^29.4   | Suporte TypeScript no Jest                   |
| jest-environment-jsdom     | ^30.3   | Ambiente DOM no Jest                         |
| Stryker Mutator            | ^9.6.1  | Mutation testing                             |
| ESLint                     | ^9      | Lint (com `eslint-config-next`)             |

> Versões extraídas do `package.json` do repo.

---

## 📁 Estrutura

```
learn_tdd/
├── __mocks__/
│   └── fileMock.ts                    # Mock de imports estáticos (SVG, imagens) em testes
├── public/                            # Assets estáticos
├── src/
│   ├── app/                           # App Router (Next.js 16)
│   │   ├── globals.css                # Estilos globais + tokens Tailwind 4 (@theme)
│   │   ├── layout.tsx                 # Root layout, metadata, fontes
│   │   ├── page.tsx                   # Página que monta o formulário
│   │   └── favicon.ico
│   ├── context/
│   │   └── ToastContext.tsx           # Context provider para toasts de feedback
│   ├── images/                        # Imagens usadas na UI
│   ├── register-product/              # Feature: cadastro de produto
│   │   ├── index.ts                   # Export barrel
│   │   ├── register-product.tsx       # Componente do formulário (produção)
│   │   └── register-product.test.tsx  # Testes colocalizados (TDD)
│   ├── reports/
│   │   └── mutation/                  # Output HTML do Stryker (gitignored)
│   └── schema/
│       └── register-product-schema.ts # Schema Zod — fonte única da validação
├── .gitignore
├── AGENTS.md                          # Instruções internas para agentes de IA
├── CLAUDE.md                          # Instruções internas para Claude Code
├── README.md                          # Este arquivo
├── eslint.config.mjs                  # ESLint 9 flat config
├── jest.config.ts                     # Jest 30 + ts-jest + jsdom
├── next.config.ts                     # Config Next.js
├── package.json
├── package-lock.json
├── postcss.config.mjs                 # PostCSS + plugin Tailwind 4
├── stryker.config.json                # Stryker mutation testing config
└── tsconfig.json
```

### Por que os testes vivem colocalizados?

A convenção `register-product.tsx` + `register-product.test.tsx` no mesmo diretório (em vez de uma pasta `__tests__/` separada) oferece:

- **Coerência:** testar o componente é parte do componente; mudanças no componente lembram do teste
- **Manutenção:** ao refactorar, você vê os dois arquivos lado a lado no editor
- **Type safety:** testes importam tipos do componente sem precisar subir níveis de pasta
- **Padrão Jest:** o runner detecta arquivos `.test.ts(x)` em qualquer lugar da árvore

---

## 🧪 Estratégia de Testes

### 1. Unitários / Component (Jest + RTL)

Cobertura de:

- Renderização do formulário com campos corretos
- Mensagens de validação por campo (Zod → RHF)
- Submissão bem-sucedida com dados válidos
- Rejeição de submissão com dados inválidos
- Comportamento de feedback (toast) via `ToastContext`

### 2. Mutation Testing (Stryker)

```bash
npm run test:mutation
```

Stryker injeta mutações no código de produção (ex.: trocar `===` por `!==`, remover condicionais, alterar literais) e roda os testes. Se os testes continuam verdes com a mutação, é sinal de que o teste é fraco.

**Métrica-chave:** *mutation score* (não confundir com coverage). 100% de coverage com 0% de mutation score significa que os testes executam o código, mas não validam seu comportamento.

### 3. Configuração do Jest (`jest.config.ts`)

- `preset: ts-jest` — suporte TypeScript nativo
- `testEnvironment: jsdom` — simula DOM
- `setupFilesAfterEnv: @testing-library/jest-dom` — matchers como `toBeInTheDocument`
- `moduleNameMapper`:
  - `^.+\\.svg$` → `__mocks__/fileMock.ts` (importar SVG em testes sem quebrar)
  - `^@/(.*)$` → `/src/$1` (alias de path idêntico ao `tsconfig.json`)
- `testPathIgnorePatterns`: `node_modules/` e `.stryker-tmp/` (não rodar artefatos do Stryker como testes)

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js 20+

### Instalação

```bash
git clone https://github.com/Guilherme-V-Rocha/learn_tdd
cd learn_tdd
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`

### Demais scripts

| Script                    | O que faz                                                       |
| ------------------------- | --------------------------------------------------------------- |
| `npm run build`           | Build de produção (gera `.next/`)                               |
| `npm run start`           | Servir o build localmente                                       |
| `npm run lint`            | Rodar ESLint 9 flat config                                      |
| `npm test`                | Rodar todos os testes Jest uma vez                              |
| `npm run test:watch`      | Modo watch (reativa a mudanças de arquivo)                      |
| `npm run test:coverage`   | Relatório de coverage                                           |
| `npm run test:mutation`   | Rodar Stryker mutation testing (lento; minutos)                 |
| `npm run test:mutation:ci`| Stryker com reporters `clear-text`, `progress` e `html` (CI)    |

> ⚠️ **Mutation testing é caro:** Stryker faz N runs de Jest (uma por mutação). Em projetos pequenos pode levar minutos; em projetos grandes, dezenas de minutos. Rode localmente quando for validar qualidade de testes, não no loop de dev.

---

## 🧬 Fluxo TDD praticado

Para cada regra de validação ou comportamento:

```
1. RED    → escreva o teste que falha (a regra ainda não existe no schema/componente)
2. GREEN  → implemente o mínimo de código para o teste passar
3. REFACTOR → melhore o código mantendo os testes verdes
```

**Exemplo concreto:** antes de escrever `min(1)` no campo `name` do schema Zod, escreva um teste que renderiza o formulário, digita string vazia, submete, e afirma que a mensagem `"Nome é obrigatório"` aparece. Veja o teste falhar. Depois adicione `.min(1, "Nome é obrigatório")` no schema. Veja passar.

> O schema Zod é a **fonte única de verdade**. Tipos são derivados com `z.infer<typeof schema>`, sem duplicação manual. Mensagens de erro vivem no schema e são consumidas pelo React Hook Form via `@hookform/resolvers/zod`.

---
## 🎨 Personalização

Para adaptar este projeto ao seu próprio estudo:

1. **Schema:** Edite `src/schema/register-product-schema.ts` para mudar regras de validação
2. **Componente:** Edite `src/register-product/register-product.tsx` (lembre de atualizar os testes no `.test.tsx` colocalizado)
3. **Feedback:** Edite `src/context/ToastContext.tsx` para mudar como feedback aparece
4. **Estilos:** Modifique `src/app/globals.css` (Tailwind 4 via `@theme` — não há `tailwind.config.ts`)
5. **Stryker:** Edite `stryker.config.json` para mutar apenas arquivos específicos ou ajustar thresholds

---

## 📊 Métricas esperadas

| Métrica                     | Alvo                              | Como medir                |
| --------------------------- | --------------------------------- | ------------------------- |
| Jest coverage               | ≥ 90% (statements, branches)      | `npm run test:coverage`   |
| Stryker mutation score      | ≥ 80%                             | `npm run test:mutation`   |
| Build time                  | < 5s                              | `npm run build`           |
| Bundle JS                   | < 200 KB                          | `next build` output       |

> Alvos são referências para projeto de estudo; ajuste conforme a maturidade do projeto. Mutation score é mais relevante que coverage para validar qualidade real dos testes.

---

## 📄 Licença

Projeto open source para fins de estudo. Sinta-se livre para usar como base, mas personalize o conteúdo para refletir sua própria trajetória de aprendizado.
