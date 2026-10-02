import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Produk } from '../produk';
import { Transaksi } from '../transaksi';
import { Animation } from '../animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  constructor(
    private produk: Produk,
    private transaksi: Transaksi,
    private animService: Animation,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  get jumlahProduk(): number {
    return this.produk.getJumlahProduk();
  }

  get jumlahTransaksiHariIni(): number {
    return this.transaksi.getJumlahHariIni();
  }

  get totalPenjualanHariIni(): number {
    return this.transaksi.getTotalHariIni();
  }

  get produkTerlaris(): string {
    return this.transaksi.getProdukTerlaris();
  }

  ionViewWillEnter() {
    this.cdr.detectChanges();
  }

  ionViewDidEnter() {
    this.animService.animateItemsIn('.kartu-ringkasan');
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }
}