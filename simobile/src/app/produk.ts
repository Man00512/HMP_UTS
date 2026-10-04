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
  kategoriTersedia: string[] = ['Sembako', 'Minuman', 'Makanan Ringan', 'Kebersihan', 'Bumbu Dapur'];

  daftarProduk: ProdukItem[] = [
    { id: 1, nama: 'Beras Pandan Wangi 5kg', kategori: 'Sembako', gambar: 'https://th.bing.com/th/id/OIP.nXP76GMeAp232tJ6aTSSRgHaHa?w=209&h=209&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 62000, hargaJual: 68000, stok: 25 },
    { id: 2, nama: 'Minyak Goreng Bimoli 2L', kategori: 'Sembako', gambar: 'https://th.bing.com/th/id/OIP.ELo_lqPZC2hoGfcQrvaLMgHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 32000, hargaJual: 36000, stok: 40 },
    { id: 3, nama: 'Gula Pasir Gulaku 1kg', kategori: 'Sembako', gambar: 'https://th.bing.com/th/id/OIP.aGCdp18Ot6c3Ljk83PHAEAHaHa?w=209&h=209&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 13000, hargaJual: 15000, stok: 3 },
    { id: 4, nama: 'Teh Botol Sosro 450ml', kategori: 'Minuman', gambar: 'https://th.bing.com/th/id/OIP.7EPPM5JcxQqPI3qhc6BD2QAAAA?w=202&h=202&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 3500, hargaJual: 4500, stok: 60 },
    { id: 5, nama: 'Kopi Kapal Api Sachet', kategori: 'Minuman', gambar: 'https://th.bing.com/th/id/OIP.hVOGbPGfz-8k4CgjJG1lwgHaHa?w=209&h=209&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 1000, hargaJual: 1500, stok: 0 },
    { id: 6, nama: 'Indomie Goreng', kategori: 'Makanan Ringan', gambar: 'https://th.bing.com/th/id/OIP.RHb9WwNY_VJHNHuyy_64xwHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 2800, hargaJual: 3200, stok: 100 },
    { id: 7, nama: 'Chitato Sapi Panggang 68g', kategori: 'Makanan Ringan', gambar: 'https://th.bing.com/th/id/OIP.5Pcfof1GqW9GmcUqc0xNWgAAAA?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 8000, hargaJual: 10000, stok: 15 },
    { id: 8, nama: 'Sabun Mandi Lifebuoy', kategori: 'Kebersihan', gambar: 'https://th.bing.com/th/id/OIP.882uTUUfRzk5wBXLKSa4mgHaHa?w=209&h=209&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 3000, hargaJual: 4000, stok: 30 },
    { id: 9, nama: 'Rinso Anti Noda 800g', kategori: 'Kebersihan', gambar: 'https://th.bing.com/th/id/OIP.ZXTr2VQO6y0bVucjFFat1wHaHa?w=210&h=210&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 14000, hargaJual: 17000, stok: 0 },
    { id: 10, nama: 'Kecap Manis ABC 220ml', kategori: 'Bumbu Dapur', gambar: 'https://th.bing.com/th/id/OIP.VZC0RnukHOOHcjb9Xqlh-QHaHa?w=216&h=215&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 8000, hargaJual: 10000, stok: 20 },
    { id: 11, nama: 'Royco Ayam', kategori: 'Bumbu Dapur', gambar: 'https://th.bing.com/th/id/OIP.lvc4ozXE4hG2WXFCPMbJQwHaHa?w=209&h=209&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', hargaBeli: 1500, hargaJual: 2000, stok: 50 },
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

  getKategori(): string[] {
    return this.kategoriTersedia;
  }

  tambahProduk(data: Omit<ProdukItem, 'id'>): ProdukItem {
    const idBaru = this.daftarProduk.length > 0
      ? Math.max(...this.daftarProduk.map(p => p.id)) + 1
      : 1;
    const baru: ProdukItem = { id: idBaru, ...data };
    this.daftarProduk.push(baru);
    return baru;
  }

  updateProduk(id: number, data: Omit<ProdukItem, 'id'>): void {
    const produk = this.getProdukById(id);
    if (produk) {
      Object.assign(produk, data);
    }
  }

  kurangiStok(id: number, jumlah: number): void {
    const produk = this.getProdukById(id);
    if (produk) {
      produk.stok = Math.max(0, produk.stok - jumlah);
    }
  }
}