import { Injectable } from '@angular/core';
import { Keranjang } from './keranjang';
import { Produk } from './produk';

export interface TransaksiItem {
  produkId: number;
  nama: string;
  qty: number;
  hargaJual: number;
  subtotal: number;
}

export interface TransaksiData {
  id: number;
  tanggal: Date;
  items: TransaksiItem[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class Transaksi {
  daftarTransaksi: TransaksiData[] = [];
  private idBerikut = 1;

  constructor(private keranjang: Keranjang, private produk: Produk) { }

  konfirmasi(): TransaksiData | undefined {
    const items = this.keranjang.getItems();
    if (items.length === 0) {
      return undefined;
    }
    const data: TransaksiData = {
      id: this.idBerikut++,
      tanggal: new Date(),
      items: items.map(i => ({
        produkId: i.produk.id,
        nama: i.produk.nama,
        qty: i.qty,
        hargaJual: i.produk.hargaJual,
        subtotal: i.produk.hargaJual * i.qty,
      })),
      total: this.keranjang.getTotalHarga(),
    };
    items.forEach(i => this.produk.kurangiStok(i.produk.id, i.qty));
    this.daftarTransaksi.unshift(data);
    this.keranjang.kosongkan();
    return data;
  }

  getSemua(): TransaksiData[] {
    return this.daftarTransaksi;
  }

  getById(id: number): TransaksiData | undefined {
    return this.daftarTransaksi.find(t => t.id === id);
  }

  private getHariIni(): TransaksiData[] {
    const hariIni = new Date().toDateString();
    return this.daftarTransaksi.filter(t => t.tanggal.toDateString() === hariIni);
  }

  getJumlahHariIni(): number {
    return this.getHariIni().length;
  }

  getTotalHariIni(): number {
    return this.getHariIni().reduce((total, t) => total + t.total, 0);
  }

  getProdukTerlaris(): string {
    const hitung: { [nama: string]: number } = {};
    this.getHariIni().forEach(t => {
      t.items.forEach(i => {
        hitung[i.nama] = (hitung[i.nama] || 0) + i.qty;
      });
    });
    let terlaris = '-';
    let terbanyak = 0;
    Object.keys(hitung).forEach(nama => {
      if (hitung[nama] > terbanyak) {
        terbanyak = hitung[nama];
        terlaris = nama;
      }
    });
    return terlaris;
  }
}