import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../shared/api.service';
import { userModel } from './user-dashboard.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup;
  userModelObj: userModel = new userModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private fb:FormBuilder,private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.formValue=this.fb.group({
      firstName:[''],
      lastName:[''],
      email: ['',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
    this.getAllUser();
  }
  clickAddUser(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
postUserDetails(){
  this.userModelObj.firstname=this.formValue.value.firstName;
  this.userModelObj.lastname=this.formValue.value.lastName;
  this.userModelObj.email=this.formValue.value.email;
  this.api.postUser(this.userModelObj).subscribe(res=>{ 
    console.log(res),
    alert("User added successfully");
    let ref = document.getElementById("cancel")
    ref?.click();
    this.formValue.reset();
    this.getAllUser();
  },
  error=>{
    alert("Something is wrong");
  })
}
getAllUser(){
  this.api.getUser().subscribe(res=>{
    this.userData = res;
  })
}
deleteUser(row:any){
 this.api.deleteUser(row.id).subscribe(res=>{
  alert("User Deleted");
  this.getAllUser();
 })
}
onEdit(row:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.userModelObj.id = row.id;
  this.formValue.controls['firstName'].setValue(row.firstname);
  this.formValue.controls['lastName'].setValue(row.lastname);
  this.formValue.controls['email'].setValue(row.email);
}
updateUserDetails(){
  this.userModelObj.firstname=this.formValue.value.firstName;
  this.userModelObj.lastname=this.formValue.value.lastName;
  this.userModelObj.email=this.formValue.value.email;
  this.api.updateUser(this.userModelObj,this.userModelObj.id).subscribe(res=>{
    alert("Updated successfully");
    this.formValue.reset();
    this.getAllUser();
  })
}
Clear(){
  localStorage.clear();
  this.router.navigate(['home'])
}
}
