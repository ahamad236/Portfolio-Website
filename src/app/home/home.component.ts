import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sidemenu: HTMLUListElement;
  tablinks: HTMLCollectionOf<HTMLParagraphElement>;
  tabcontents: HTMLCollectionOf<HTMLDivElement>;
  readonly scriptURL = 'https://script.google.com/macros/s/AKfycbwuyiyZakkc8NUVGPiAhGJUnTJPEDJrh8OVRtNVCGwlW4EwzvNL0nR6bgO-3csWDHiX/exec';

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

  opentab(tabname: string, event: any) {
    for (let tablink of this.tablinks) {
      tablink.classList.remove('active-link')
    }

    for (let tabcontent of this.tabcontents) {
      tabcontent.classList.remove('active-tab')
    }

    event.currentTarget.classList.add('active-link')
    document.getElementById(tabname)?.classList.add('active-tab')
  }

  onSubmit(event: any, submitToGoogleSheetForm: NgForm) {
    event.preventDefault();
    console.log(submitToGoogleSheetForm.value);

    const msg = document.getElementById('msg');

    const formData = new URLSearchParams();
    formData.append('Name', submitToGoogleSheetForm.value.Name)
    formData.append('Email', submitToGoogleSheetForm.value.Email)
    formData.append('Message', submitToGoogleSheetForm.value.Message)

    fetch(this.scriptURL,
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: formData
      }
    )
      .then(response => {
        console.log('Success!', response);

        // msg!.innerHTML = "Message Sent Successfully";
        // setTimeout(() => {
        //   msg!.innerHTML = '';
        // }, 5000)

        alert("Message Sent Successfully");

        submitToGoogleSheetForm.reset();
      })
      .catch(response => console.log('Success!', response))
  }
}
