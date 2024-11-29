import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {
  showHideForm = false;
  title : any;
  btn : any;
  lineWidth : any;
  clickCard = false;
  alert = false;
  sentence : string = "";


  showForm(form : any, event : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    if(!this.showHideForm) {
      form.style.visibility = "visible";
      form.style.height = 100 + "%";
    } else {
      form.style.visibility = "hidden";
      form.style.height = 0;
    }
    this.showHideForm = !this.showHideForm;
  }

  update(form : any, event : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    if(this.clickCard) {
      this.alert = false;
    } else {
      this.alert = true;
      this.sentence = "You should choose one card."
      return;
    }
    if(!this.showHideForm) {
      form.style.visibility = "visible";
      form.style.height = 100 + "%";
    } else {
      form.style.visibility = "hidden";
      form.style.height = 0;
    }
    this.showHideForm = !this.showHideForm;
  }

  closeAlert() {
    this.alert = false;
  }

    cardClicked() {
    this.clickCard = true;
  }

  delCard(form : any, event : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    if(this.clickCard) {
      this.alert = false;
    } else {
      this.alert = true;
      this.sentence = "You should choose one card."
      return;
    }
  }
}
