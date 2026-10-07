import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  isDarkMode: boolean = false;

  constructor() { }
}