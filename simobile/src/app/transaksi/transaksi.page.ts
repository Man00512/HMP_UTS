import { Component, OnInit } from '@angular/core';
import { Transaksi, TransaksiData } from '../transaksi';
import { Theme } from '../theme';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit {
  daftar: TransaksiData[] = [];

  constructor(private transaksiService: Transaksi, public theme: Theme) { }

  ngOnInit() {
    this.daftar = this.transaksiService.getSemua();
  }

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