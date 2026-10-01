import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Keranjang } from './keranjang';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router, private keranjang: Keranjang) { }

  logout() {
    this.keranjang.kosongkan();
    this.router.navigate(['/dashboard']);
  }
}