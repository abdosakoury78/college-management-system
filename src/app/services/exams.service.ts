import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  http = inject(HttpClient);
  exams : any[] = [];
  fetchData() {
    // for(let batch of this.batches.batches) {
      this.http.get("http://computerenginners-hu.runasp.net/api/Courses/GetAllExams").subscribe((data : any ) => {this.exams = data.data;
      console.log(this.exams);
  });
    // }
  }
}
