# VMS Frontend

Ini adalah frontend untuk aplikasi Visitor Management System (VMS) menggunakan Next.js 1 App Router dan Tailwind CSS, terhubung dengan backend Node.js + Express + Prisma.

## Fitur

- Login multi-role: SUPERUSER, ADMIN, RECEPTIONIST
- Dashboard dengan statistik dan grafik
- CRUD Users
- CRUD Devices
- CRUD Visitors dengan integrasi Face Recognition
- Responsive UI menggunakan Tailwind CSS
- Animasi transisi dengan framer-motion
- Dark mode


## Instalasi
### 1. Clone repository

```bash
git clone https://github.com/username/vms-frontend.git
cd vms-frontend
```
### 2. Install dependencies

```bash
npm install
```

### 3. Buat file environment variable
Buat file .env.local di root project dan isi dengan:

ini
```bash
NEXT_PUBLIC_API_URL=http://<backend_ip>:<port>/api
JWT_SECRET=your_jwt_secret
```
Contoh:

```bash
NEXT_PUBLIC_API_URL=http://13.45.56.78:5000/api
JWT_SECRET=your_secret
```
Pastikan JWT_SECRET sama dengan di backend.

### 5. Jalankan project

```bash
npm run dev
Aplikasi akan berjalan di http://localhost:3000
```

## Deployment
## Vercel
### 1. Push project ke GitHub

### 2. Login ke Vercel dan import project dari GitHub

Pada pengaturan environment variables di Vercel, tambahkan:

```bash
NEXT_PUBLIC_API_URL=http://<backend_ip>:<port>/api
JWT_SECRET=your_jwt_secret
```
Contoh:

```bash
NEXT_PUBLIC_API_URL=http://13.45.56.78:5000/api
JWT_SECRET=your_secret
```
### 3. Deploy

Vercel akan otomatis build dan deploy project.

## Scripts
- npm run dev : Menjalankan server development Next.js
- npm run build : Build aplikasi untuk production
- npm start : Menjalankan aplikasi hasil build production

## Catatan Tambahan
- Pastikan backend sudah berjalan dan dapat diakses publik sebelum frontend dideploy.
- Pastikan CORS backend mengizinkan origin dari domain frontend.
- Jika mengalami error ECONNREFUSED, berarti backend belum terhubung atau environment variable salah.
- Struktur project menggunakan Next.js App Router dan server actions ('use server').


## Contributing

Kontribusi sangat kami harapkan!
Untuk perubahan besar, silakan buka issue terlebih dahulu untuk mendiskusikan apa yang ingin Anda ubah.

---

## Contact

Untuk pertanyaan lebih lanjut, silakan hubungi: **ibnutopanit05@gmail.com**