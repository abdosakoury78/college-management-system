import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CoursesService } from '../services/courses.service';
import { BatchesService } from '../services/batches.service';
import { HttpClient } from '@angular/common/http';
import { ExamsService } from '../services/exams.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  showHideForm = false;
  title : any;
  btn : any;
  lineWidth : any;
  clickCard = false;
  alert = false;
  sentence : string = "";
  courses = inject(CoursesService);
  batches = inject(BatchesService);
  exams = inject(ExamsService);
  loginService = inject(LoginService);
  http = inject(HttpClient);
  batchSelected : string = "";
  formData : any;
  courseId : any;
  selectedDiv: number | null = null;
  selectedTeacher : any;


  showForm(form : any, event : any,  duration : any, date : any) {
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
    duration.value = "";
    date.value = "";
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

  onSubmit(event : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    const studentData = {
      courseId: this.courseId,
      exam_Duration: this.formData.get("duration"),
      exam_Date: this.formData.get("date")
    };


    if (this.btn === "Add") {
      // Add student (POST request)
      this.http.post("http://computerenginners-hu.runasp.net/api/Courses/AddExam", studentData).subscribe(res => {
        console.log('Student added:', res);
        this.exams.fetchData();
        this.alert = true;
        this.sentence = "You Added Successfully.";
      });
    }
  }

  closeAlert() {
    this.alert = false;
  }

  cardClicked(teacher : any) {
    this.clickCard = true;
    this.selectedDiv = teacher?.id;
    this.selectedTeacher = teacher;
  }

  selectBatch2(course : any) {
    this.courseId = course.target.value;
  }

  delCard(form : any, event : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    if(this.clickCard) {
      this.alert = false;
      this.http.delete("http://computerenginners-hu.runasp.net/api/Courses/DeleteExam?id="+ this.selectedTeacher.id).subscribe(res => {
        console.log(res);
        this.exams.exams = this.exams.exams.filter(student => student.id !== this.selectedTeacher.id);
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
    this.exams.fetchData();
  }
}
