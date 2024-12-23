import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginService } from '../services/login.service';
import { BatchesService } from '../services/batches.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{
  logicSer = inject(LoginService);
  btn : string = "";
  products : any;
  http = inject(HttpClient);
  formData : any;
  batches = inject(BatchesService);
  batchId : any;

  qrLines: number[] = [];
  initQrLines() {
    const storedQrLines = sessionStorage.getItem('qrLines');
    if (storedQrLines) {
      this.qrLines = JSON.parse(storedQrLines);
    } else {
      this.qrLines = Array(35)
      .fill(0)
      .map(() => Math.floor(Math.random() * 3) + 1);
      sessionStorage.setItem('qrLines', JSON.stringify(this.qrLines));
    }
  }

  click(event : any) {
    this.btn = event.target.textContent;
    console.log(this.btn);
  }

  onSubmit(event : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);

    for(let batch of this.batches.batches) {
      if(batch.name === this.logicSer.student?.batchName) {
        this.batchId = batch.id;
        break;
      }
    }
    // console.log();
    const UpdateStudentData = {
      id: this.logicSer.student?.id,
      name: this.formData.get("name"),
      email: this.logicSer.student?.email,
      password: this.formData.get("password"),
      phoneNum: this.formData.get("phone"),
      gpa: this.logicSer.student?.gpa,
      batchId: this.batchId
    };

    if (this.btn === "Cancel") {
      // Add student (POST request)
      this.fetchData();
      // this.logicSer.student = this.products.filter(stu => stu.id === this.logicSer.student.id);
    } else if(this.btn === "Save") {
      this.http.put("http://computerenginners-hu.runasp.net/api/Students", UpdateStudentData).subscribe(res => {
        console.log(res);
        this.fetchData();
      });
    }
  }

  fetchData() {
    this.http.get("http://computerenginners-hu.runasp.net/api/Students").subscribe((data : any ) => {this.products = data.data
      console.log(this.products);
      for(let student of this.products) {
        if(student.id === this.logicSer.student.id) {
          this.logicSer.student = student;
          console.log(this.logicSer.student);
          break;
        }
      }
    });
  }
  ngOnInit(): void {
    this.initQrLines();
    this.fetchData();
    this.batches.fetchData();
  }
}
