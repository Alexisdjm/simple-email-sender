# Usa una imagen de node como base
FROM node:lts-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente de la aplicación
COPY . .

# Expone el puerto 80 (o el puerto que uses en tu aplicación Express)
EXPOSE 443

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["node", "app.js"]