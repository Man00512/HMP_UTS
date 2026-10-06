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
  idBerikut = 1;

  constructor(private keranjang: Keranjang, private produk: Produk) { }

  konfirmasi(): TransaksiData | undefined {
    const items = this.keranjang.getItems();
    if (items.length == 0) {
      return undefined;
    }

    const barisStruk: TransaksiItem[] = [];
    for (let i = 0; i < items.length; i++) {
      barisStruk.push({
        produkId: items[i].produk.id,
        nama: items[i].produk.nama,
        qty: items[i].qty,
        hargaJual: items[i].produk.hargaJual,
        subtotal: items[i].produk.hargaJual * items[i].qty,
      });
      this.produk.kurangiStok(items[i].produk.id, items[i].qty);
    }

    const data: TransaksiData = {
      id: this.idBerikut,
      tanggal: new Date(),
      items: barisStruk,
      total: this.keranjang.getTotalHarga(),
    };
    this.idBerikut++;

    this.daftarTransaksi.unshift(data);
    this.keranjang.kosongkan();
    return data;
  }

  getSemua(): TransaksiData[] {
    return this.daftarTransaksi;
  }

  getById(id: number): TransaksiData | undefined {
    for (let i = 0; i < this.daftarTransaksi.length; i++) {
      if (this.daftarTransaksi[i].id == id) {
        return this.daftarTransaksi[i];
      }
    }
    return undefined;
  }

  getHariIni(): TransaksiData[] {
    const hariIni = new Date().toDateString();
    const hasil: TransaksiData[] = [];
    for (let i = 0; i < this.daftarTransaksi.length; i++) {
      if (this.daftarTransaksi[i].tanggal.toDateString() == hariIni) {
        hasil.push(this.daftarTransaksi[i]);
      }
    }
    return hasil;
  }

  getJumlahHariIni(): number {
    return this.getHariIni().length;
  }

  getTotalHariIni(): number {
    const hariIni = this.getHariIni();
    let total = 0;
    for (let i = 0; i < hariIni.length; i++) {
      total += hariIni[i].total;
    }
    return total;
  }

  getProdukTerlaris(): string {
    const hariIni = this.getHariIni();
    const namaProduk: string[] = [];
    const jumlahTerjual: number[] = [];

    for (let i = 0; i < hariIni.length; i++) {
      for (let j = 0; j < hariIni[i].items.length; j++) {
        const barang = hariIni[i].items[j];
        const posisi = namaProduk.indexOf(barang.nama);   // -1 = belum pernah dicatat
        if (posisi == -1) {
          namaProduk.push(barang.nama);
          jumlahTerjual.push(barang.qty);
        } else {
          jumlahTerjual[posisi] += barang.qty;
        }
      }
    }

    let terlaris = '-';
    let terbanyak = 0;
    for (let i = 0; i < namaProduk.length; i++) {
      if (jumlahTerjual[i] > terbanyak) {
        terbanyak = jumlahTerjual[i];
        terlaris = namaProduk[i];
      }
    }
    return terlaris;
  }
}
