import { Injectable } from '@angular/core';
import { ProdukItem } from './produk';

export interface KeranjangItem {
  produk: ProdukItem;
  qty: number;
}

@Injectable({
  providedIn: 'root',
})
export class Keranjang {
  items: KeranjangItem[] = [];

  constructor() { }

  cariIndex(id: number): number {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].produk.id == id) {
        return i;
      }
    }
    return -1;
  }

  tambahKeKeranjang(produk: ProdukItem): boolean {
    const index = this.cariIndex(produk.id);
    if (index >= 0) {
      if (this.items[index].qty >= produk.stok) {
        return false;
      }
      this.items[index].qty++;
      return true;
    }
    if (produk.stok < 1) {
      return false;
    }
    this.items.push({ produk: produk, qty: 1 });
    return true;
  }

  kurangi(id: number) {
    const index = this.cariIndex(id);
    if (index >= 0) {
      this.items[index].qty--;
      if (this.items[index].qty <= 0) {
        this.hapus(id);
      }
    }
  }

  hapus(id: number) {
    const index = this.cariIndex(id);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  kosongkan() {
    this.items.splice(0, this.items.length);
  }

  getItems(): KeranjangItem[] {
    return this.items;
  }

  getTotalItem(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].qty;
    }
    return total;
  }

  getTotalHarga(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].produk.hargaJual * this.items[i].qty;
    }
    return total;
  }
}