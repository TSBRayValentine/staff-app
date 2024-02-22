# Используем официальный образ Node.js v16 в качестве базового образа
FROM node:16

# Установка зависимостей для бэкенда
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Копирование файлов бэкенда
COPY . .

EXPOSE 5000

# Определение команды для запуска приложения
CMD ["node", "app.js"]