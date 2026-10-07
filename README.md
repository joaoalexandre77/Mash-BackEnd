# Back-End — Mash API REST

API REST do Mash (migração do app monolítico [`conloq/mash`](https://github.com/conloq/mash)) — Express 5 + Sequelize + MySQL.

## Stack

- Node.js (ESM), Express 5, Sequelize, MySQL (database `mash`)
- JWT Bearer + Argon2id (memoryCost 2^16, timeCost 3, parallelism 1)
- Multer (memoryStorage) → Cloudinary
- Swagger: `GET /api-docs`

## Como rodar

```bash
npm install
npm start        # porta 8080
```

## Variáveis de ambiente (`.env` — NUNCA commitar valores reais)

```
DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE,
JWT_SECRET_KEY, CLOUD_NAME, API_KEY_CLOUDINARY, API_SECRET_KEY_CLOUDINARY
```

## Padrão de resposta (decisão da equipe — base: aula-05 DW3)

**Sucesso:**
- Operação sem entidade: `{ "message": "<texto>" }` — ex.: `{ "message": "Receita criada com sucesso" }`
- Operação que devolve entidade: `{ "message": "<texto>", "<singular>": { ... } }`
- Detalhe: `{ "<singular>": { ... } }` — ex.: `{ "recipe": { ... } }`
- Listagem: `{ "<plural>": [ ... ] }` — ex.: `{ "recipes": [...] }`
- **Não usar wrapper genérico `data`.**

**Erro** (string direta em português, sem código interno):
- `400`: `{ "error": "<regra de validação>" }` — ex.: `{ "error": "Nome é obrigatório" }`
- `401`: `{ "error": "Token inválido ou expirado" }`
- `404`: `{ "error": "<Recurso> não encontrado" }` — também para recurso de outro usuário, em leitura, alteração e exclusão (não revelar existência)
- `409`: `{ "error": "Receita já existe" }`
- `500`: `{ "error": "Erro interno do servidor" }`

**DELETE:** `204` sem corpo — encerrar com `res.sendStatus(204)`

Regras de nomes (decisão de 28/09/2026, #30): rotas, tabelas, colunas e payload em inglês snake_case; coleção no plural (`/recipes`, `/lots`, `/analyses`), recurso único no singular (`/user`), `login` à parte; parâmetro de rota `:id`; chave estrangeira `<entidade>_id` (`user_id`, `recipe_id`). O payload usa o nome da coluna, sem camada de tradução — `res.json(registro)` entrega o registro cru. Colunas em português mudam de nome: `nome` → `name`, `fone` → `phone`; a tabela `receitas` passa a `recipes`. Referência: aula-05 DW3 e aula-08 DW2 (`cliente_id`).

A especificação dos endpoints do depósito do PI (03/11/2026) está nas issues de contrato de [`conloq/mash`](https://github.com/conloq/mash/issues/66) (roteiro #66 e issues do épico #30).

## Banco e Sequelize

- Runtime vigente: `Connection.sync()` no startup (`app.js`).
- Os timestamps `createdAt` e `updatedAt` ficam como o Sequelize gera; são as únicas chaves do JSON fora do snake_case.
- A pasta `migrations/` existe (decisão da equipe, #66 de 26/09), mas os arquivos atuais **não estão prontos para uso** (não executar). Schema/migration é trabalho separado, com issue própria.
- ⚠️ Evitar: `define: { underscored: true }` global **não pode** ser ativado no schema existente (renomearia `createdAt`/`updatedAt` e FKs). Se `models` novos precisarem, usar opção local no model, com migration testada em banco vazio.

## Regras de contribuição

- **Nunca commitar direto na `main`** — branch própria + pull request + peer review (ver [#35](https://github.com/conloq/mash/issues/35)). Nota: o repo é privado e o plano free **não permite branch protection**; até o time decidir, a disciplina é manual e revisão é obrigatória.
- Conventional Commits em pt-BR: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
- Issues principais: [#30](https://github.com/conloq/mash/issues/30) (épico migração), [#32](https://github.com/conloq/mash/issues/32) (CRUD receitas), [#38](https://github.com/conloq/mash/issues/38) (auth/IDOR), [#41](https://github.com/conloq/mash/issues/41) (validação manual do contrato HTTP), [#60](https://github.com/conloq/mash/issues/60) (contrato de análise de iodo).

## Estrutura

```
├── controllers/     # finos: validam input, mapeiam erros para status HTTP
├── services/        # regras de negócio, exportados como singleton (export default new X())
├── middlewares/     # authMiddleware (JWT), multer
├── models/          # Sequelize via Connection; colunas, tabelas e payload em inglês snake_case (mesmo nome, sem camada de tradução)
├── routes/          # routers por entidade
├── migrations/      # fora de uso até serem revisados (decisão 26/09)
└── config/          # sequelize, cloudinary, associations, swagger
```
