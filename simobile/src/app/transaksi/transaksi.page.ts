import { Component } from '@angular/core';
import { Transaksi, TransaksiData } from '../transaksi';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage {
  daftar: TransaksiData[] = [];

  constructor(private transaksiService: Transaksi) { }

  ionViewWillEnter() {
    this.daftar = this.transaksiService.getSemua();
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }

  formatTanggal(tanggal: Date): string {
    return tanggal.toLocaleString('id-ID');
  }
}