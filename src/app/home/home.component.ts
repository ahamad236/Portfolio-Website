import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sidemenu: HTMLUListElement;
  tablinks: HTMLCollectionOf<HTMLParagraphElement>;
  tabcontents: HTMLCollectionOf<HTMLDivElement>;

  constructor() {
    this.sidemenu = document.getElementById("sidemenu") as HTMLUListElement;
    this.tablinks = document.getElementsByClassName('tab-links') as HTMLCollectionOf<HTMLParagraphElement>;
    this.tabcontents = document.getElementsByClassName('tab-contents') as HTMLCollectionOf<HTMLDivElement>;
  }

  openmenu() {
    this.sidemenu = document.getElementById("sidemenu") as HTMLUListElement;
    this.sidemenu.style.right = "0";
  }

  closemenu() {
    this.sidemenu = document.getElementById("sidemenu") as HTMLUListElement;
    this.sidemenu.style.right = "-200px";
  }  

  opentab(tabname: string, event: any){
    for(let tablink of this.tablinks){
      tablink.classList.remove('active-link')
    }

    for(let tabcontent of this.tabcontents){
      tabcontent.classList.remove('active-tab')
    }

    event.currentTarget.classList.add('active-link')
    document.getElementById(tabname)?.classList.add('active-tab')
  }
        
}
