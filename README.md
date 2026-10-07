# Back-End — Mash API REST

API REST do Mash — Express 5 + Sequelize + MySQL.

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

## Variáveis de ambiente

```
DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE,
JWT_SECRET_KEY, CLOUD_NAME, API_KEY_CLOUDINARY, API_SECRET_KEY_CLOUDINARY
```

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
