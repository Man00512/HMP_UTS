import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage implements OnInit {

  constructor() {}

  toggleDarkMode() {
    document.body.classList.toggle('dark');
  }

  ngOnInit() {   // 👈 ini yang kemungkinan hilang
  }

}