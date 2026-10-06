import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaksi, TransaksiData } from '../transaksi';

@Component({
  selector: 'app-transaksi-detail',
  templateUrl: './transaksi-detail.page.html',
  styleUrls: ['./transaksi-detail.page.scss'],
  standalone: false,
})
export class TransaksiDetailPage implements OnInit {
  transaksi: TransaksiData | undefined;

  constructor(private route: ActivatedRoute, private transaksiService: Transaksi) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transaksi = this.transaksiService.getById(Number(params['id']));
    });
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }

  formatTanggal(tanggal: Date): string {
    return tanggal.toLocaleString('id-ID');
  }
}