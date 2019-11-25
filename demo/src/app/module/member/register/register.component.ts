import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { MustMatch } from 'src/app/helper/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  spinner = false;
  constructor(
    private fb: FormBuilder,
    private api: Service,
    private url: UrlConfig,
    private router: Router
  ) { }

  /* Form creation */
  createForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  /*  Access to form fields */
  get register() {
    return this.registerForm.controls;
  }

  /* Sign up action */
  signUp() {
    this.submitted = true;
    if (this.registerForm.valid) {
      /* Preparing the post data */
      const postObj = {
        firstName: this.registerForm.value.firstName,
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        acceptTerms: this.registerForm.value.acceptTerms,
      };
      this.spinner = true;
      /* Api call*/
      this.api.postCall(this.url.urlConfig().userList, JSON.stringify(postObj), 'post').subscribe(res => {
        this.spinner = false;
        if (res) {
          this.router.navigate(['/login']);
        }
      },
      error => {
        this.spinner = false;
      });
    }
  }

  ngOnInit() {
    /* Check whether login/not */
    if (!this.api.validUser()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']);
    }
    /* Call the form creation while on component initiation */
    this.createForm();
  }

}
