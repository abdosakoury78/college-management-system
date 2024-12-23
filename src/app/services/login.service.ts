import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged = false;
  isAdmin = true;
  isStudent = false;
  student : any;
  admin : any;
  // student = {
  //   batchName: "Batch59",
  //   batchYear: "Shopamore",
  //   email: "Maged@",
  //   gpa: 4,
  //   id: 9,
  //   name: "Magedd",
  //   password: "023688544",
  //   phoneNum: "123654"
  // };
}
