import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Transaksi, TransaksiData } from '../transaksi';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit {
  daftar: TransaksiData[] = [];

  constructor(private transaksiService: Transaksi, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.daftar = this.transaksiService.getSemua();
  }

  ionViewWillEnter() {
    this.cdr.detectChanges();
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }

  formatTanggal(tanggal: Date): string {
    return tanggal.toLocaleString('id-ID');
  }
}