# Etapa 1: Construcción de la aplicación
FROM node:23-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias y archivos necesarios
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Configuración del servidor web (Nginx)
FROM nginx:1.27-alpine AS production

# Copiar los archivos estáticos al directorio predeterminado de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando predeterminado
CMD ["nginx", "-g", "daemon off;"]