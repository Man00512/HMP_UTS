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

  ionViewWillEnter() {
    this.gelap = document.body.classList.contains('dark');
  }

  toggleDarkMode(event: any) {
    this.gelap = event.detail.checked;
    document.body.classList.toggle('dark', this.gelap);
  }
}