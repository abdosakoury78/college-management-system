import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.css'
})
export class HelpPageComponent implements OnInit{
  http = inject(HttpClient);
  loginSer = inject(LoginService);
  helpMes : any[] = [];
  students : any[] = [];
  studnett : any;
  help : any;
  messClicked = false;

  fetchData() {
    this.http.get("http://computerenginners-hu.runasp.net/api/HelpMessages").subscribe((data : any ) => {this.helpMes = data.data
      console.log(this.helpMes);
    });
  }

  fetchData2() {
    this.http.get("http://computerenginners-hu.runasp.net/api/Students").subscribe((data : any ) => {this.students = data.data
      console.log(this.students);
    });
  }

  clickMess(student : any, help : any) {
    this.messClicked = true;
    this.studnett = student;
    this.help = help;
  }

  delCard(messageId : any) {
      this.http.delete("http://computerenginners-hu.runasp.net/api/HelpMessages?id="+ messageId.id).subscribe(res => {
        console.log(res);
        this.fetchData();
        this.fetchData2();
        this.messClicked = false;
      });
  }
  ngOnInit(): void {
    this.fetchData();
    this.fetchData2();
  }
}
