import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatchesService{
  http = inject(HttpClient);
  batches : any[] = [];
  fetchData() {
    this.http.get("http://computerenginners-hu.runasp.net/api/Batchs").subscribe((data : any ) => this.batches = data.data);
    console.log(this.batches);
  }
}
