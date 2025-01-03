import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CoursesService } from '../services/courses.service';
import { BatchesService } from '../services/batches.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})
export class TimetableComponent implements OnInit{
  showHideForm = false;
  title : any;
  btn : any;
  lineWidth : any;
  clickCard = false;
  alert = false;
  sentence : string = "";
  loginService = inject(LoginService);
  courses = inject(CoursesService);
  batches = inject(BatchesService);
  http = inject(HttpClient);
  batchSelected : string = "";
  batchId : any;
  formData : any;
  selectedDiv: number | null = null;
  selectedTeacher : any;
  products : any[] = [];
  showForm(form : any, event : any, name : any, hours : any) {
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
    this.selectedTeacher = null;
    this.clickCard = false;
    this.selectedDiv = null;
    name.value = "";
    hours.value = "";
  }

  update(form : any, event : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    if(this.clickCard) {
      this.alert = false;
    } else {
      this.alert = true;
      this.sentence = "You should choose one card.";
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

  cardClicked(teacher : any) {
    this.clickCard = true;
    this.selectedDiv = teacher?.id;
    this.selectedTeacher = teacher;
  }

  onSubmit(event : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    const teacherData = {
      title: this.formData.get("name"),
      hours: this.formData.get("hours"),
      batchId: this.batchId
    };

    if (this.btn === "Add") {
      // Add student (POST request)
      this.http.post('http://computerenginners-hu.runasp.net/api/Courses', teacherData).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.courses.fetchData();
          this.batches.fetchData();
          this.alert = true;
          this.sentence = "You Added Successfully.";
        },
        error: (error) => {
          console.error('Error:', error.error);
        }
      });

    }
  }

  selectBatch2(batch : any) {
    this.batchId = batch.target.value;
  }
  delCard(form : any, event : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    if(this.clickCard) {
      this.alert = false;
      this.http.delete("http://computerenginners-hu.runasp.net/api/Courses?id="+ this.selectedTeacher.id).subscribe(res => {
        console.log(res);
        this.courses.courses = this.courses.courses.filter(student => student.id !== this.selectedTeacher.id);
      });
    } else {
      this.alert = true;
      this.sentence = "You should choose one card."
      return;
    }
  }
  ngOnInit(): void {
    this.courses.fetchData();
    this.batches.fetchData();
  }
}
