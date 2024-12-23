import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { BatchesService } from '../services/batches.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  // variables declearitions
  showHideForm = false;
  title : any;
  btn : any;
  lineWidth : any;
  clickCard = false;
  alert = false;
  sentence : string = "";
  batchSelected : string = "";
  formData : any;
  selectedDiv: number | null = null;
  selectedStudent : any;
  http = inject(HttpClient);
  products : any[] = [];
  batches = inject(BatchesService);
  batchId : any;
  isSelect = false;
  qrLines: number[] = [];

// function for showing form when click on the button "Add"
  showForm(form : any, event : any, name : any, email : any, password : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    this.isSelect = true;
    if(!this.showHideForm) {
      form.style.visibility = "visible";
      form.style.height = 100 + "%";
    } else {
      form.style.visibility = "hidden";
      form.style.height = 0;
    }
    this.showHideForm = !this.showHideForm;
    this.selectedStudent = null;
    this.clickCard = false;
    this.selectedDiv = null;
    name.value = "";
    email.value = "";
    password.value = "";
  }

  // function for showing form when click on the button "Update"
  update(form : any, event : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    this.isSelect = false;
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

  // fuction for closing alert when working
  closeAlert() {
    this.alert = false;
  }

  // fuction for chossing card and take the info of this card.
  cardClicked(student : any) {
    this.clickCard = true;
    this.selectedDiv = student?.id;
    this.selectedStudent = student;
  }

// fuction for submiting the form when adding or updating
  onSubmit(event : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    const studentData = {
      name: this.formData.get("name"),
      email: this.formData.get("email"),
      password: this.formData.get("password"),
      phoneNum: "",
      gpa: (((Math.random() * 4)).toFixed(1)),
      batchId: this.batchId
    };

    // take the batchId from the student when we update
    for(let batch of this.batches.batches) {
      if(batch.name === this.selectedStudent?.batchName) {
        this.batchId = batch.id;
        break;
      }
    }
    const UpdateStudentData = {
      id: this.selectedStudent?.id,
      name: this.formData.get("name"),
      email: this.formData.get("email"),
      password: this.formData.get("password"),
      phoneNum: this.selectedStudent?.phoneNum,
      gpa: this.selectedStudent?.gpa,
      batchId: this.batchId
    };

    if (this.btn === "Add") {
      // Add student (POST request)
      this.http.post("http://computerenginners-hu.runasp.net/api/Students/", studentData).subscribe(res => {
        console.log('Student added:', res);
        this.fetchData();
        this.alert = true;
        this.sentence = "You Added Successfully.";
      });
    } else if(this.btn === "Update") {
      // Update student (PUT request)
      this.http.put("http://computerenginners-hu.runasp.net/api/Students/", UpdateStudentData).subscribe(res => {
        console.log(res);
        this.fetchData();
        this.alert = true;
        this.sentence = "You Updated Successfully.";
      });
    }
  }

  // create QR code fuction
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

  initWidth(index: number): number {
    // Return the static width value from qrLines based on the index
    return this.qrLines[index];
  }

// delete student function
  delCard(form : any, event : any) {
    event.preventDefault();
    this.title = event.target.textContent;
    this.btn = event.target.textContent;
    if(this.clickCard) {
      this.alert = false;
      this.http.delete("http://computerenginners-hu.runasp.net/api/Students?id="+ this.selectedStudent.id).subscribe(res => {
        console.log(res);
        this.products = this.products.filter(student => student.id !== this.selectedStudent.id);
      });
    } else {
      this.alert = true;
      this.sentence = "You should choose one card."
      return;
    }
  }

  // select batch id in add and select for filtering batches
  selectBatch(batch : any) {
    this.batchSelected = batch.target.value;
  }

  // when form adding student we take the id of the selected batchId
  selectBatch2(batch : any) {
    this.batchId = batch.target.value;
  }

// get students function
  fetchData() {
    this.http.get("http://computerenginners-hu.runasp.net/api/Students").subscribe((data : any ) => {this.products = data.data
      console.log(this.products);
    });
  }

// when you navigate to this component this function will work first
  ngOnInit(): void {
    this.fetchData();
    this.initQrLines();
    this.batches.fetchData();
  }
}
