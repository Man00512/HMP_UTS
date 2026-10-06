import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Produk } from '../produk';
import { Transaksi } from '../transaksi';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {

  constructor(
    private produkService: Produk,
    private transaksiService: Transaksi,
    private animationCtrl: AnimationController,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  jumlahProduk(): number {
    return this.produkService.getJumlahProduk();
  }

  jumlahTransaksiHariIni(): number {
    return this.transaksiService.getJumlahHariIni();
  }

  totalPenjualanHariIni(): number {
    return this.transaksiService.getTotalHariIni();
  }

  produkTerlaris(): string {
    return this.transaksiService.getProdukTerlaris();
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
    this.cdr.detectChanges();
  }

  ionViewDidEnter() {
    this.munculkanRingkasan();
  }
}
