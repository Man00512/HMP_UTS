import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Produk } from '../produk';
import { Transaksi } from '../transaksi';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  jmlProduk = 0;
  jmlTransaksi = 0;
  totalPenjualan = 0;
  namaTerlaris = '-';

  constructor(
    private produkService: Produk,
    private transaksiService: Transaksi,
    private animationCtrl: AnimationController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.muatData();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/dashboard' || event.url === '/') {
          this.muatData();
        }
      }
    });
  }

  muatData() {
    this.jmlProduk = this.produkService.getJumlahProduk();
    this.jmlTransaksi = this.transaksiService.getJumlahHariIni();
    this.totalPenjualan = this.transaksiService.getTotalHariIni();
    this.namaTerlaris = this.transaksiService.getProdukTerlaris();
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }

  munculkanRingkasan() {
    const elemen = document.querySelector('#ringkasan') as HTMLElement;
    const animation = this.animationCtrl
      .create()
      .addElement(elemen)
      .duration(600)
      .easing('ease-out')
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateY(30px)' },
        { offset: 1, opacity: '1', transform: 'translateY(0px)' },
      ]);
    animation.play();
  }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {
    this.munculkanRingkasan();
  }
}