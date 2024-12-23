import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from '../services/courses.service';
import { AssignmentService } from '../services/assignment.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit{
  // variables declearitions
  showHideForm = false;
  title : any;
  btn : any;
  lineWidth : any;
  clickCard = false;
  alert = false;
  sentence : string = "";
  batchSelected : string = "";
  number : number = 0;
  courses = inject(CoursesService);
  assignSub = inject(AssignmentService);
  loginSer = inject(LoginService);
  courseId : any;
  formData : any;
  selectedDiv: number | null = null;
  selectedTeacher : any;
  http = inject(HttpClient);
  products : any[] = [];

// function for showing form when click on the button "Add"
  showForm(form : any, event : any, name : any, email : any) {
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
    email.value = "";
  }

  // function for showing assign form
  showForm2(form : any, teacher : any) {
    if(!this.showHideForm) {
      form.style.visibility = "visible";
      form.style.height = 100 + "%";
    } else {
      form.style.visibility = "hidden";
      form.style.height = 0;
    }
    this.showHideForm = !this.showHideForm;
    this.selectedDiv = teacher?.id;
    this.selectedTeacher = teacher;
    console.log(this.selectedDiv);
  }

  lastTapTime: number = 0;
// function doubleTap for mobiles
onDoubleTap(form : any, teacher : any) {
  const currentTime = new Date().getTime();
  const tapInterval = currentTime - this.lastTapTime;

  if (tapInterval < 300 && tapInterval > 0) {
    this.showForm2(form, teacher)
  }

  this.lastTapTime = currentTime;
}


// function for canceling assign form
  cancelForm(form : any, event : any) {
    event.preventDefault();
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
  }

  // function for showing form when click on the button "Update"
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

  // fuction for submiting the form when adding or updating
  onSubmit(event : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    const teacherData = {
      name: this.formData.get("name"),
      email: this.formData.get("email"),
      specialization: ""
    };

    const UpdateStudentData = {
      id: this.selectedTeacher?.id,
      name: this.formData.get("name"),
      email: this.formData.get("email")
    };
    if (this.btn === "Add") {
      // Add student (POST request)
      this.http.post("http://computerenginners-hu.runasp.net/api/Doctors", teacherData).subscribe(res => {
        console.log('Student added:', res);
        this.fetchData();
        this.alert = true;
        this.sentence = "You Added Successfully.";
      });
    } else if(this.btn === "Update") {
      this.http.put("http://computerenginners-hu.runasp.net/api/Doctors", UpdateStudentData).subscribe(res => {
        console.log(res);
        this.fetchData();
        this.alert = true;
        this.sentence = "You Updated Successfully.";
      });
    }
  }

// fuction for submiting the assignForm when adding
  onSubmit2(event : any) {
    event.preventDefault();
    const teacherData = {
      doctorId: this.selectedTeacher?.id,
      courseId: this.courseId
    };
    this.http.post("http://computerenginners-hu.runasp.net/api/DoctorsCourses", teacherData).subscribe(res => {
      console.log('Student added:', res);
      this.assignSub.fetchData();
    });
  }

  closeAlert() {
    this.alert = false;
  }

  cardClicked(teacher : any) {
    this.clickCard = true;
    if(this.clickCard) {
      this.selectedDiv = teacher?.id;
      this.selectedTeacher = teacher;
    } else {
      this.selectedDiv = null;
      this.selectedTeacher = null;
    }
    // console.log(this.selectedTeacher);
  }

  clickSub = false;
  selectedSub : any;
  cardClicked2(teacher : any) {
    this.clickSub = true;
    if(this.clickSub) {
      this.selectedSub = teacher?.courseName;
      this.selectedTeacher = teacher;
    } else {
      this.selectedSub = null;
      this.selectedTeacher = null;
    }
    console.log(this.selectedTeacher);
  }

  selectBatch2(course : any) {
    this.courseId = course.target.value;
    if(this.courseId == '0') {
      this.alert = true;
      this.sentence = "You should choose one card.";
      return;
    }
    console.log(this.courseId);
  }

  // function for deleting assign subject to professor
  delAssign() {
    // event.preventDefault();
    console.log(this.selectedTeacher.doctorId);
    // console.log(this.courseId);
    const teacherData = {
      doctorId: this.selectedTeacher?.doctorId,
      courseId: this.selectedTeacher?.courseId
    };
    if(this.clickSub) {
      this.alert = false;
      this.http.delete("http://computerenginners-hu.runasp.net/api/DoctorsCourses", {body: teacherData}).subscribe(res => {
        console.log(res);
        this.assignSub.fetchData();
      });
    } else {
      this.alert = true;
      this.sentence = "You should choose one card."
      return;
    }
  }

  delCard(event : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    if(this.clickCard) {
      this.alert = false;
      this.http.delete("http://computerenginners-hu.runasp.net/api/Doctors?id="+ this.selectedTeacher.id).subscribe(res => {
        console.log(res);
        this.products = this.products.filter(student => student.id !== this.selectedTeacher.id);
      });
    } else {
      this.alert = true;
      this.sentence = "You should choose one card."
      return;
    }
  }

  fetchData() {
    this.http.get('http://computerenginners-hu.runasp.net/api/Doctors').subscribe({
      next: (data: any) => {
        this.products = data.data as any[];
        console.log('Fetched products:', data);
        console.log('Products array:', this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.courses.fetchData();
    this.assignSub.fetchData();
  }
}
