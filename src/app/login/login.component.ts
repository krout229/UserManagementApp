import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators,FormGroup,FormControl,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public LoginForm = this.fb.group({​​​​​
    emailid: ['',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]], 
    password: ['', Validators.required]});
    submitted = false;
    
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }
  get password(){
    return this.LoginForm.get('password');
  }
  get emailid(){
    return this.LoginForm.get('emailid');
    }
  get f() { return this.LoginForm.controls; }
  
  Clear(){
    this.LoginForm.reset();
  }
 proceedLogin(email:any){
  localStorage.setItem('admin@admin.com',email);
  this.router.navigate(['dashboard']);
 }
}
