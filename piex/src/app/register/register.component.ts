import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../user/UserService";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  myReactiveForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      email: [``, Validators.compose([Validators.required, Validators.email])],
      password: [``, Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z]/)])],
      // confirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      first_name: ``,
      middle_name: ``,
      last_name : ``,
      phone: ``,
      birth: ``,
      role: ``
    });
  }
  onSubmit() {
    this.userService.addUser(this.myReactiveForm.value).subscribe();
     console.log('Form submitted: ', this.myReactiveForm.value);
  }
}
