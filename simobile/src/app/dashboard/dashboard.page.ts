import { Component, OnInit } from '@angular/core';
import { Produk } from '../produk';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {

  jumlahProduk = 0;
  totalTransaksiHariIni = 0;
  produkTerlaris = '-';

  constructor(private produk:Produk) { }

  ngOnInit() {
    this.ringkasan();
  }
  
  ionViewWillEnter() {//Untuk selalu update ringkasan
    this.ringkasan();
  }
  private ringkasan(): void {
    this.jumlahProduk = this.produk.getJumlahProduk();
  }

}
