import { Component, OnInit } from '@angular/core';
import { Transaksi, TransaksiData } from '../transaksi';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit {
  daftar: TransaksiData[] = [];

  constructor(private transaksiService: Transaksi) { }

  ngOnInit() {
    this.daftar = this.transaksiService.getSemua();
  }

  ionViewWillEnter() {
    this.daftar = this.transaksiService.getSemua();
  }

  // * Format angka ke Rupiah
  // ? DIPANGGIL DARI HTML: {{ formatRupiah(t.total) }}
  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }

  formatTanggal(tanggal: Date): string {
    return tanggal.toLocaleString('id-ID');
  }
}