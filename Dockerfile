FROM node:21-bookworm as Builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate && npm run build


FROM node:21-bookworm
LABEL org.opencontainers.image.source=https://github.com/PartPilotLab/PartPilot
LABEL org.opencontainers.image.description="Electronic Part Catalog"
LABEL org.opencontainers.image.licenses=AGPL-3.0

WORKDIR /app

COPY --from=Builder /app/public             ./public
COPY --from=Builder /app/.next              ./.next
COPY --from=builder /app/node_modules       ./node_modules
COPY --from=builder /app/package*.json      ./
COPY --from=Builder /app/prisma             ./prisma


EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start:migrate"]