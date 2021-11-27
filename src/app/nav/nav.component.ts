import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  siteLanguage: string = 'Portugues';
  siteLocale: string;
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Portugues' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.siteLocale = window.location.pathname.split('/')[1];
    this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale).label;
  }

}
