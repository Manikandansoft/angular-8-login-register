import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  spinner = false;
  constructor(
    private fb: FormBuilder,
    private api: Service,
    private url: UrlConfig,
    private router: Router
    ) {}
  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
   /*  Access to form fields */
  get login() { return this.loginForm.controls; }

  /* Login */
  onClickSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const urlString = '?username=' + this.loginForm.value.username +
      '&password=' + this.loginForm.value.password;
      this.spinner = true;
       /* Api call*/
      this.api.getList(this.url.urlConfig().userLogin.concat(urlString)).subscribe(res => {
        this.spinner = false;
        if (res.length) {
          sessionStorage.setItem('currentUser', JSON.stringify(res[0]));
          this.router.navigate(['/home']);
        } else {
          this.api.alertConfig = this.api.modalConfig('Error', 'User/Password is not valid', true);
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
