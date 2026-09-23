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
  
  tambahKeKeranjang(produk: ProdukItem) {
    const itemAda = this.items.find(i => i.produk.id === produk.id);
    if (itemAda) {
      itemAda.qty += 1;
    } else {
      this.items.push({ produk: produk, qty: 1 });
    }
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