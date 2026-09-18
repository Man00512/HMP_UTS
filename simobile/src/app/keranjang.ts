import { Injectable } from '@angular/core';
import { Produk } from './produk';

@Injectable({
  providedIn: 'root'
})
export class KeranjangService {

  items: Produk[] = [];

  constructor() { }

 
  tambahKeranjang(produk: Produk) {
    this.items.push(produk);
  }
}