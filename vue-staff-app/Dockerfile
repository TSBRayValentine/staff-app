FROM node:16 as build-stage

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

# устанавливаем зависимости проекта
RUN npm install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

# собираем приложение для production с минификацией
RUN npm run build

# этап production (production-stage)
FROM nginx:mainline-alpine3.18-perl as production-stage

# COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN mkdir /app
COPY --from=build-stage /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf



CMD ["nginx", "-g", "daemon off;"]


