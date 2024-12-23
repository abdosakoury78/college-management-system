import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  http = inject(HttpClient);
  courses : any[] = [];
  fetchData() {
    this.http.get("http://computerenginners-hu.runasp.net/api/Courses").subscribe((data : any ) => this.courses = data.data);
    console.log(this.courses);
  }
  
}
