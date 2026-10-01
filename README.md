# SIMOBILE - Aplikasi Kasir Mobile Toko Makmur Jaya

Prototipe aplikasi kasir berbasis Ionic Angular untuk UTS Hybrid Mobile Programming.

## Instalasi

1. Pastikan Node.js dan Ionic CLI sudah terpasang: `npm install -g @ionic/cli`
2. Clone repository ini
3. Masuk ke folder project: `cd simobile`
4. Install dependensi: `npm install`

## Menjalankan Aplikasi

    ionic serve

Buka http://localhost:8100 di browser.

## Fitur yang Berhasil Diimplementasikan

- Navigasi Tab (Dashboard, Produk, Transaksi, Profil) dengan Drawer (Pengaturan, Tentang Aplikasi, Logout)
- Dashboard: jumlah produk, total transaksi hari ini, total penjualan, produk terlaris
- Pencarian produk real-time dengan ngModel dan filter kategori
- Detail produk lewat route parameter (stok, harga beli, harga jual, estimasi untung)
- Gambar default dan tombol tambah ke keranjang otomatis disable saat stok 0
- Form tambah dan edit produk dengan Reactive Form dan validasi
- Angular Service: Produk, Keranjang, Transaksi
- Custom theme hijau-kuning dan toggle mode gelap
- Animasi: kartu produk, tombol keranjang, ringkasan dashboard, logo
- Keranjang dan checkout (konfirmasi transaksi)
- Riwayat transaksi dan detail transaksi
- 11 data dummy produk dari 5 kategori

## Anggota Kelompok

- NRP - Nama