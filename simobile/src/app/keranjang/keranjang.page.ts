import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keranjang, KeranjangItem } from '../keranjang';
import { Transaksi } from '../transaksi';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {
  items: KeranjangItem[] = [];

  constructor(
    private keranjangService: Keranjang,
    private transaksiService: Transaksi,
    private router: Router
  ) { }

  ngOnInit() {
    this.items = this.keranjangService.getItems();
  }

  ionViewWillEnter() {
    this.items = this.keranjangService.getItems();
  }

  totalBelanja(): number {
    return this.keranjangService.getTotalHarga();
  }

  tambah(item: KeranjangItem) {
    this.keranjangService.tambahKeKeranjang(item.produk);
  }

  kurang(item: KeranjangItem) {
    this.keranjangService.kurangi(item.produk.id);
  }

  hapus(item: KeranjangItem) {
    this.keranjangService.hapus(item.produk.id);
  }

  konfirmasi() {
    const hasil = this.transaksiService.konfirmasi();
    if (hasil) {
      this.router.navigate(['/transaksi-detail', hasil.id]);
    }
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }
}
