# Gunakan image dasar yang sesuai dengan lingkungan yang diinginkan (misalnya, Node.js)
FROM node:18-buster

# Instal dependensi sistem yang diperlukan
RUN apt-get update && apt-get install -y \
    uuid-dev \
    libcairo2 \
    libpango1.0-dev \
    libjpeg-dev \
    giflib-tools \
    librsvg2-dev \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Tentukan direktori kerja untuk aplikasi
WORKDIR /app

# Salin package.json dan install dependensi
COPY package.json ./
RUN npm install

# Salin sisa aplikasi ke dalam kontainer
COPY . .

# Ekspos port yang akan digunakan oleh aplikasi (opsional, jika diperlukan)
EXPOSE 3000

# Tentukan perintah untuk menjalankan aplikasi menggunakan PM2
CMD ["node", "index.js"]
