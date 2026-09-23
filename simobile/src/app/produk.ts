import { Injectable } from '@angular/core';

export interface ProdukItem {
  id: number;
  nama: string;
  kategori: string;
  gambar: string;      // dikosongkan ('') kalau foto belum ada -> ditampilkan gambar default
  hargaBeli: number;
  hargaJual: number;
  stok: number;
}

@Injectable({
  providedIn: 'root',
})
export class Produk {

  // minimal 10 data dummy, variasi harga / stok / kategori
  daftarProduk: ProdukItem[] = [
    {
      id: 1,
      nama: 'Beras Pandan Wangi 5kg',
      kategori: 'Sembako',
      gambar: 'https://picsum.photos/seed/beras/300/300',
      hargaBeli: 62000,
      hargaJual: 68000,
      stok: 25,
    },
    {
      id: 2,
      nama: 'Minyak Goreng Bimoli 2L',
      kategori: 'Sembako',
      gambar: 'https://picsum.photos/seed/minyak/300/300',
      hargaBeli: 32000,
      hargaJual: 36000,
      stok: 40,
    },
    {
      id: 3,
      nama: 'Gula Pasir Gulaku 1kg',
      kategori: 'Sembako',
      gambar: 'https://picsum.photos/seed/gula/300/300',
      hargaBeli: 13000,
      hargaJual: 15000,
      stok: 3,
    },
    {
      id: 4,
      nama: 'Teh Botol Sosro 450ml',
      kategori: 'Minuman',
      gambar: 'https://picsum.photos/seed/teh/300/300',
      hargaBeli: 3500,
      hargaJual: 4500,
      stok: 60,
    },
    {
      id: 5,
      nama: 'Kopi Kapal Api Sachet',
      kategori: 'Minuman',
      gambar: 'https://picsum.photos/seed/kopi/300/300',
      hargaBeli: 1000,
      hargaJual: 1500,
      stok: 0, // stok habis -> tombol tambah ke keranjang harus disable
    },
    {
      id: 6,
      nama: 'Indomie Goreng',
      kategori: 'Makanan Ringan',
      gambar: 'https://picsum.photos/seed/indomie/300/300',
      hargaBeli: 2800,
      hargaJual: 3200,
      stok: 100,
    },
    {
      id: 7,
      nama: 'Chitato Sapi Panggang 68g',
      kategori: 'Makanan Ringan',
      gambar: '', // belum difoto -> pakai gambar default
      hargaBeli: 8000,
      hargaJual: 10000,
      stok: 15,
    },
    {
      id: 8,
      nama: 'Sabun Mandi Lifebuoy',
      kategori: 'Kebersihan',
      gambar: 'https://picsum.photos/seed/sabun/300/300',
      hargaBeli: 3000,
      hargaJual: 4000,
      stok: 30,
    },
    {
      id: 9,
      nama: 'Rinso Anti Noda 800g',
      kategori: 'Kebersihan',
      gambar: 'https://picsum.photos/seed/rinso/300/300',
      hargaBeli: 14000,
      hargaJual: 17000,
      stok: 0, // stok habis
    },
    {
      id: 10,
      nama: 'Kecap Manis ABC 220ml',
      kategori: 'Bumbu Dapur',
      gambar: 'https://picsum.photos/seed/kecap/300/300',
      hargaBeli: 8000,
      hargaJual: 10000,
      stok: 20,
    },
    {
      id: 11,
      nama: 'Royco Ayam',
      kategori: 'Bumbu Dapur',
      gambar: 'https://picsum.photos/seed/royco/300/300',
      hargaBeli: 1500,
      hargaJual: 2000,
      stok: 50,
    },
  ];

  getSemuaProduk(): ProdukItem[] {
    return this.daftarProduk;
  }

  getProdukById(id: number): ProdukItem | undefined {
    return this.daftarProduk.find(p => p.id === id);
  }
}