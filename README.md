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
- Form tambah dan edit produk dengan ngModel dan validasi manual sesuai Week 4 dan 6
- Angular Service: Produk, Keranjang, Transaksi
- Custom theme hijau-kuning dan toggle mode gelap
- Animasi: kartu produk, tombol keranjang, ringkasan dashboard, logo
- Keranjang dan checkout (konfirmasi transaksi)
- Riwayat transaksi dan detail transaksi
- 11 data dummy produk dari 5 kategori

## Acuan Materi Week 1-7

| Materi | Penggunaan dalam SIMOBILE |
| --- | --- |
| Week 1, TypeScript | Interface, array, object, fungsi, loop for, kondisi, import/export |
| Week 2, routing dan navigasi | NgModule, routerLink, parameter route, drawer, tombol kembali, navigasi bawah |
| Week 3, binding | Interpolation dan pemanggilan fungsi, property binding gambar/disabled, event click |
| Week 4, directive | ngModel, ngIf, ngFor, validasi memakai RegEx |
| Week 5, layout | Card, grid, list, segment, route parameter dengan ActivatedRoute |
| Week 6, service dan form | Service Produk/Keranjang/Transaksi, constructor injection, input/select/alert, Router.navigate |
| Week 7, theme dan animasi | variables.scss, style per halaman, AnimationController dan keyframes |

Currency pipe diganti pemanggilan fungsi melalui interpolation. Salinan array
memakai slice, penambahan riwayat memakai concat, dan animasi tidak memakai delay
atau forEach. Dark mode tetap dipertahankan karena diminta soal UTS.
Method string/number untuk pencarian dan format rupiah, serta event siklus halaman
Ionic untuk memperbarui data, tetap dipakai untuk mendukung fitur aplikasi.

Penyesuaian ini bukan klaim bahwa setiap API tercantum secara literal dalam slide.
Konfigurasi framework dan perangkat pengujian juga bukan materi kode fitur aplikasi.

## Perbaikan Error

- Tombol Simpan sebelumnya berhenti karena input number Ionic menghasilkan angka,
  tetapi validasi memanggil hargaBeli.trim(). Nilai angka dan null sekarang divalidasi
  dengan benar, kemudian aplikasi kembali ke daftar produk setelah berhasil.
- Validasi gagal mempertahankan isian lain; pesan diperbarui ketika pengguna
  memperbaiki kolomnya. Form tambah dibersihkan setelah penyimpanan berhasil.
- Edit dengan ID yang tidak ditemukan menampilkan pesan dan tidak dapat disimpan.
- Pencarian menerima nilai kosong/null dari tombol hapus input.
- Gambar kosong atau gagal dimuat memakai assets/no-image.svg yang tersedia lokal.
- Checkout memeriksa seluruh stok sebelum mengubah stok/riwayat. Jika stok berubah
  sesudah barang masuk keranjang, pengguna diminta memperbaiki jumlah terlebih dahulu.
- Produk terlaris dihitung berdasarkan ID agar pergantian nama tidak memecah hitungan.
- Konfigurasi test menyediakan routing; lint tetap mengizinkan pola NgModule,
  constructor injection, ngIf, dan ngFor yang digunakan dalam materi kuliah.

## Pengujian

Jalankan dari folder simobile:

    npm run build
    npm run lint
    npm test -- --watch=false
    node test-runtime.js

Pengujian browser memerlukan hasil build terbaru dan browser Puppeteer yang sudah
tersedia. Script membuka server lokal sementara dan menutupnya sesudah pengujian.
Skenario mencakup tambah/edit produk, validasi, gambar gagal, pencarian, checkout,
riwayat, dashboard, stok habis, dark mode, dan URL edit tidak valid.
File spec.ts dan test-runtime.js adalah alat pengujian, tidak dimuat ke aplikasi.

## Batasan dan Ketentuan UTS yang Belum Terpenuhi

- Form masih memakai ngModel/validasi manual mengikuti materi. Reactive Forms yang
  secara khusus diminta soal UTS belum diimplementasikan.
- Dua reusable custom component dan susunan folder pages/components/services/models
  belum diimplementasikan. Navigasi bawah masih berupa tab-bar pada tiap halaman,
  belum menggunakan satu kontainer ion-tabs.
- Data hanya berada di memori service dan akan kembali ke data awal setelah reload.
  Tidak ada database, API, ataupun localStorage.
- Foto produk asli masih menggunakan URL eksternal. Saat tidak tersedia, aplikasi
  menampilkan gambar cadangan lokal; foto asli tidak disimpan untuk penggunaan offline.
- Ionic versi terpasang dapat memberi peringatan deprecation untuk IonicModule;
  pola NgModule dipertahankan sesuai materi, tanpa migrasi ke standalone.

## Anggota Kelompok
- 160424031 - Oey Mathew Farrel Wiyono
- 160424095 - Aston Christianto
- 160424120 - Imanuel Ferdinand Sormin
- 160424132 - Artchie Leonheart Constantianus
