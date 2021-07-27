import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit() {
    // <---- used to initialize the form
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      response =>  {
        const { token, message } = response;
        localStorage.setItem('token', token);
        if (this.authService.redirectUrl) {
          console.log('redirect url', this.authService.redirectUrl);
          const redirectUrl = this.authService.redirectUrl;
          this.authService.redirectUrl = '';
          this.router.navigate([redirectUrl]);
      } else {
        this.redirectToUsers()
      }
      }
    );

  }

  redirectToUsers() {
    this.router.navigate(['/users']);
  }
}
