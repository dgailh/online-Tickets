import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../user/UserService";
import {AlertService} from "../service/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  myReactiveForm: FormGroup;
  constructor(private flashMSG:AlertService,
    private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      email: [``, Validators.compose([Validators.required,
                Validators.email
                ])],
      password: [``, Validators.compose([Validators.required,
                  Validators.minLength(6),
                  Validators.pattern(/^[a-zA-Z]/)])],
      first_name: [``,Validators.compose([Validators.required])],
      middle_name: ``,
      last_name : ``,
      phone: ``,
      birth: ``,
      role: ``
    });
  }


  onSubmit() {
    //checking email before commiting
    this.userService.checkEmail(this.myReactiveForm.get('email').value).subscribe(data => {
      if (data.responseIndicator == 2) {
        this.userService.addUser(this.myReactiveForm.value).subscribe();
        console.log('Form submitted: ', this.myReactiveForm.value);

      } else
        this.flashMSG.flashMSG(data.text, data.responseIndicator);;
    },
      error1 => console.log(error1),
      ()=> console.log('checking email'));

  }
}
