import { Component, OnInit } from '@angular/core';
import { Produk } from '../produk';
import { Transaksi } from '../transaksi';
import { Animation } from '../animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  jumlahProduk = 0;
  jumlahTransaksiHariIni = 0;
  totalPenjualanHariIni = 0;
  produkTerlaris = '-';

  constructor(
    private produk: Produk,
    private transaksi: Transaksi,
    private animService: Animation
  ) { }

  ngOnInit() {
    this.ringkasan();
  }

  ionViewWillEnter() {
    this.ringkasan();
  }

  ionViewDidEnter() {
    this.animService.animateItemsIn('.kartu-ringkasan');
  }

  private ringkasan(): void {
    this.jumlahProduk = this.produk.getJumlahProduk();
    this.jumlahTransaksiHariIni = this.transaksi.getJumlahHariIni();
    this.totalPenjualanHariIni = this.transaksi.getTotalHariIni();
    this.produkTerlaris = this.transaksi.getProdukTerlaris();
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }
}