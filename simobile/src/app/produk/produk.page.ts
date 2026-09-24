import { Component, OnInit } from '@angular/core';
import { Produk, ProdukItem } from '../produk';
import { Keranjang } from '../keranjang';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  listProduk: ProdukItem[] = [];

  constructor(private produk: Produk, private keranjang: Keranjang) { }

  ngOnInit() {
    this.listProduk = this.produk.getSemuaProduk();
  }

  get produkTampil(): ProdukItem[] {
    return this.listProduk;
  }
  get jumlahKeranjang(): number {
    return this.keranjang.getTotalItem();
  }
  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }

}
