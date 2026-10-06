import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage implements OnInit {
  gelap = false;

  constructor() { }

  ngOnInit() {
    this.gelap = document.body.classList.contains('dark');
  }

  toggleDarkMode() {
    if (this.gelap) {
      document.body.classList.add('dark');      // tambah class "dark" -> warna gelap
    } else {
      document.body.classList.remove('dark');   // hapus class "dark" -> warna terang
    }
  }
}