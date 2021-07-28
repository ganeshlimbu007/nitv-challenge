import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit() {
    // <---- used to initialize the form
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signIn() {
    this.submitted = true

    if(this.loginForm.valid){
    this.authService.login(this.loginForm.value).subscribe(
      response =>  {
        const { token, message } = response;
        localStorage.setItem('token', token);
        this.successConfirmation('Logged in successfully!!!')
        if (this.authService.redirectUrl) {
          const redirectUrl = this.authService.redirectUrl;
          this.authService.redirectUrl = '';
          this.router.navigate([redirectUrl]);
      } else {
        this.redirectToUsers()
      }
      },
      error => {
        this.errorServerResponse(error.message);
      }
    );
} else {
  this.invalidError('unable to login');
}
  }

  get formLogin() {
    return this.loginForm.controls;
  }

  redirectToUsers() {
    this.router.navigate(['/users']);
  }


    // <--- page route related methods (START) --->
  // exit this route
  exit() {
    this.router.navigate(["../.."], { relativeTo: this.route });
  }
  // <--- page route related methods (END) --->

  // <--- Toastr messages (START) --->
  // success confirmation toastr
  successConfirmation(message: string) {
    this.toastr.success("Success!!!", message, {
      timeOut: 2000,
      positionClass: "toast-top-center",
      closeButton: true,
      progressBar: true,
    });
  }

  // server error tostr
  errorServerResponse(error) {
    this.toastr.error("Failure! Server Error!!", error.message, {
      timeOut: 0,
      extendedTimeOut: 0,
      positionClass: "toast-top-full-width",
      closeButton: true,
      progressBar: true,
    });
  }

  //  invalid toastr
  invalidError(message: string) {
    this.toastr.error("Failure!!!", message, {
      timeOut: 2000,
      positionClass: "toast-top-center",
      closeButton: true,
      progressBar: true,
    });
  }

  // <--- Toastr messages (END) --->
}
