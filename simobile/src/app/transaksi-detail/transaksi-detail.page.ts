import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaksi, TransaksiData } from '../transaksi';
import { Theme } from '../theme';

@Component({
  selector: 'app-transaksi-detail',
  templateUrl: './transaksi-detail.page.html',
  styleUrls: ['./transaksi-detail.page.scss'],
  standalone: false,
})
export class TransaksiDetailPage implements OnInit {
  transaksiId = 0;
  transaksi: TransaksiData | undefined;

  constructor(private route: ActivatedRoute, private transaksiService: Transaksi, public theme: Theme) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transaksiId = Number(params['id']);
      this.transaksi = this.transaksiService.getById(this.transaksiId);
    });
  }

  ionViewWillEnter() {
    this.transaksi = this.transaksiService.getById(this.transaksiId);
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }

  formatTanggal(tanggal: Date): string {
    return tanggal.toLocaleString('id-ID');
  }
}