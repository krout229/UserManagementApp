import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators,FormGroup,FormControl,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public LoginForm = this.fb.group({​​​​​
    emailid: ['',[Validators.required,Validators.email]], 
    password: ['', Validators.required]});
    submitted = false;
    
  constructor(private fb:FormBuilder) { }

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
 
}
