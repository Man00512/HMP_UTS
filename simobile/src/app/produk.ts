import { Injectable } from '@angular/core';

export interface ProdukItem {
  id: number;
  nama: string;
  kategori: string;
  gambar: string;      
  hargaBeli: number;
  hargaJual: number;
  stok: number;
}

@Injectable({
  providedIn: 'root',
})
export class Produk {

  daftarProduk: ProdukItem[] = [
    {
      id: 1,
      nama: 'Beras Pandan Wangi 5kg',
      kategori: 'Sembako',
      gambar: 'https://tse1.mm.bing.net/th/id/OIP.y1wMIva9R7CUe_G9MJE5kgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      hargaBeli: 62000,
      hargaJual: 68000,
      stok: 25,
    },
    {
      id: 2,
      nama: 'Minyak Goreng Bimoli 2L',
      kategori: 'Sembako',
      gambar: 'https://tse3.mm.bing.net/th/id/OIP.QE46gj4MRLAKI1yB4hDjfQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      hargaBeli: 32000,
      hargaJual: 36000,
      stok: 40,
    },
    {
      id: 3,
      nama: 'Gula Pasir Gulaku 1kg',
      kategori: 'Sembako',
      gambar: '',
      hargaBeli: 13000,
      hargaJual: 15000,
      stok: 3,
    },
    {
      id: 4,
      nama: 'Teh Botol Sosro 450ml',
      kategori: 'Minuman',
      gambar: '',
      hargaBeli: 3500,
      hargaJual: 4500,
      stok: 60,
    },
    {
      id: 5,
      nama: 'Kopi Kapal Api Sachet',
      kategori: 'Minuman',
      gambar: '',
      hargaBeli: 1000,
      hargaJual: 1500,
      stok: 0, 
    },
    {
      id: 6,
      nama: 'Indomie Goreng',
      kategori: 'Makanan Ringan',
      gambar: '',
      hargaBeli: 2800,
      hargaJual: 3200,
      stok: 100,
    },
    {
      id: 7,
      nama: 'Chitato Sapi Panggang 68g',
      kategori: 'Makanan Ringan',
      gambar: '', 
      hargaBeli: 8000,
      hargaJual: 10000,
      stok: 15,
    },
    {
      id: 8,
      nama: 'Sabun Mandi Lifebuoy',
      kategori: 'Kebersihan',
      gambar: '',
      hargaBeli: 3000,
      hargaJual: 4000,
      stok: 30,
    },
    {
      id: 9,
      nama: 'Rinso Anti Noda 800g',
      kategori: 'Kebersihan',
      gambar: '',
      hargaBeli: 14000,
      hargaJual: 17000,
      stok: 0,
    },
    {
      id: 10,
      nama: 'Kecap Manis ABC 220ml',
      kategori: 'Bumbu Dapur',
      gambar: '',
      hargaBeli: 8000,
      hargaJual: 10000,
      stok: 20,
    },
    {
      id: 11,
      nama: 'Royco Ayam',
      kategori: 'Bumbu Dapur',
      gambar: '',
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

  getJumlahProduk(): number {
    return this.daftarProduk.length;
  }
}