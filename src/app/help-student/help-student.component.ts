import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-help-student',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './help-student.component.html',
  styleUrl: './help-student.component.css'
})
export class HelpStudentComponent {
  formData : any;
  loginSer = inject(LoginService);
  http = inject(HttpClient);
  alert = false;
  sentence = "";

  closeAlert() {
    this.alert = false;
  }
  onSubmitMessage(event : any, name : any, email : any, message : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    let helpMess = {
      message: this.formData.get("Message"),
      studentId: this.loginSer.student?.id
    }
    this.http.post("http://computerenginners-hu.runasp.net/api/HelpMessages", helpMess).subscribe(res => {
      console.log('Student added:', res);
      this.alert = true;
      this.sentence = "You Sent Successfully.";
    });
    name.value = "";
    email.value = "";
    message.value = "";
  }
}
