import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

/*
import { Component, LOCALE_ID, Inject } from '@angular/core';

@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'] 
}) 

export class AppComponent { 
  title = 'i18nDemo'; 
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'es', label: 'Espanol' }];
    constructor(
      @Inject(LOCALE_ID) protected localeId: string) { 
        
      } 
    }
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  languageList = [
    { code: 'en-US', label: 'English' },
    { code: 'pt', label: 'Portuguese' }];
  
  constructor(
    private router: Router,
    @Inject(LOCALE_ID) protected localeId: string) { }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang') || 'pt';

    const headers = new HttpHeaders({
      'Accept-Language': lang
    });

    this.router.navigate(["login"])

  }

  public static fade(acao: string, tempo: number, elemento: string): void {
    if (acao == "in") {
      $(elemento).css("opacity", "0")
      $(elemento).show();
      setTimeout(() => {
        $(elemento).css("opacity", "100%")
      }, tempo)
    }
    else if (acao == "out") {
      $(elemento).css("opacity", "0")
      setTimeout(() => {
        $(elemento).hide();
      }, tempo)
    }
  }

  public static abreLoading() {
    $("#modalLoading").modal("show");
  }

  public static fechaLoading() {
    setTimeout(() => {
      $("#modalLoading").modal("hide");
    }, 500)
  }

}
