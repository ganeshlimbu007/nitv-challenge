import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Countries } from '../shared/constants/countries';
import { UsersServiceService } from '../shared/users-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  countryNames = Countries;

  constructor(private formBuilder: FormBuilder, private usersService: UsersServiceService) {}

  ngOnInit(): void {
    this.formInit();

    console.log(this.countryNames)
  }

  private formInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['',Validators.required],
      gender: [null, Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      nationality: ['Nepal', Validators.required],
      dob: ['', Validators.required],
      edu: ['', Validators.required],
      preferredModeOfContact: ['', Validators.required],
    });
  }

  submitUserInfo() {
    console.log(this.userForm.value);
    this.usersService.createUser(this.userForm.value).subscribe(
      response => console.log(response)
    );
  }

  getCountries() {
    return this.countryNames;
  }
  selectNationality(event: any) {

  }
}
