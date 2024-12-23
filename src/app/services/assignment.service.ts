import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  http = inject(HttpClient);
  assignmentSub : any[] = [];
  fetchData() {
    this.http.get("http://computerenginners-hu.runasp.net/api/DoctorsCourses").subscribe((data : any ) => {this.assignmentSub = data.data
      console.log(this.assignmentSub);
    });
  }
}
