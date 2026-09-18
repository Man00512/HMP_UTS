import { Injectable } from '@angular/core';

export interface Produk {
  id: number;
  nama: string;
  kategori: string;
  hargaBeli: number;
  hargaJual: number;
  stok: number;
  gambar: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdukService {

  produkList: Produk[] = [
    { id: 1, nama: 'Beras 5kg', kategori: 'Sembako', hargaBeli: 60000, hargaJual: 68000, stok: 12, gambar: '' },
    { id: 2, nama: 'Minyak Goreng 1L', kategori: 'Sembako', hargaBeli: 15000, hargaJual: 18000, stok: 20, gambar: '' },
    { id: 3, nama: 'Gula Pasir 1kg', kategori: 'Sembako', hargaBeli: 13000, hargaJual: 16000, stok: 0, gambar: '' },
    { id: 4, nama: 'Telur Ayam 1kg', kategori: 'Segar', hargaBeli: 25000, hargaJual: 29000, stok: 15, gambar: '' },
    { id: 5, nama: 'Indomie Goreng', kategori: 'Instan', hargaBeli: 2800, hargaJual: 3500, stok: 50, gambar: '' },
    { id: 6, nama: 'Teh Celup', kategori: 'Minuman', hargaBeli: 7000, hargaJual: 9000, stok: 10, gambar: '' },
    { id: 7, nama: 'Kopi Sachet', kategori: 'Minuman', hargaBeli: 12000, hargaJual: 15000, stok: 0, gambar: '' },
    { id: 8, nama: 'Sabun Mandi', kategori: 'Kebutuhan Rumah', hargaBeli: 4000, hargaJual: 6000, stok: 30, gambar: '' },
    { id: 9, nama: 'Deterjen Bubuk 1kg', kategori: 'Kebutuhan Rumah', hargaBeli: 14000, hargaJual: 18000, stok: 8, gambar: '' },
    { id: 10, nama: 'Sikat Gigi', kategori: 'Kebutuhan Rumah', hargaBeli: 3000, hargaJual: 5000, stok: 25, gambar: '' },
  ];

  constructor() { }

  getAllProduk(): Produk[] {
    return this.produkList;
  }

  // TAMBAHAN untuk halaman detail
  getProdukById(id: number): Produk | undefined {
    return this.produkList.find(p => p.id === id);
  }
}