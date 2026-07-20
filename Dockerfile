FROM node:20-alpine

WORKDIR /app

# 安装依赖
COPY package.json ./
RUN npm install --omit=dev

# 复制服务端代码（qa-server.js）
COPY qa-server.js ./

# 复制 docs 目录（知识库内容）
COPY docs ./docs

EXPOSE 3456

ENV NODE_ENV=production
ENV PORT=3456

CMD ["node", "qa-server.js"]
