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

  tambahKeKeranjang(produk: ProdukItem): boolean {
    const itemAda = this.items.find(i => i.produk.id === produk.id);
    if (itemAda) {
      if (itemAda.qty >= produk.stok) {
        return false;
      }
      itemAda.qty += 1;
      return true;
    }
    if (produk.stok < 1) {
      return false;
    }
    this.items.push({ produk: produk, qty: 1 });
    return true;
  }

  kurangi(id: number): void {
    const item = this.items.find(i => i.produk.id === id);
    if (!item) {
      return;
    }
    item.qty -= 1;
    if (item.qty <= 0) {
      this.hapus(id);
    }
  }

  hapus(id: number): void {
    this.items = this.items.filter(i => i.produk.id !== id);
  }

  kosongkan(): void {
    this.items = [];
  }

  getItems(): KeranjangItem[] {
    return this.items;
  }

  getTotalItem(): number {
    return this.items.reduce((total, i) => total + i.qty, 0);
  }

  getTotalHarga(): number {
    return this.items.reduce((total, i) => total + (i.produk.hargaJual * i.qty), 0);
  }
}