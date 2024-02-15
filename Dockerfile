FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY frontend/package*.json frontend/
RUN npm run install-frontend

COPY backend/package*.json backend/
RUN npm run install-backend

COPY frontend/ frontend/
RUN npm run build --prefix frontend

COPY backend/ backend/

USER node

CMD ["npm", "run", "--prefix", "backend", "start-both"]

EXPOSE 8000 80

# docker build -t image-name .
# docker run -p 8000:8000 -p 80:80 image-name # if "start": "next start -p 80"
# docker run -p 8000:8000 -p 3000:3000 image-name # if "start": "next start"

# /app
#   ├── backend
#   │   ├── package.json
#   │   └── ...
#   └── frontend
#       ├── package.json
#       └── ...