import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Countries } from '../shared/constants/countries';
import { UsersServiceService } from '../shared/users-service.service';
import { requiredFileType } from '../shared/custom-validation/requireFileType';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  countryNames = Countries;

  @Input() user: any | null;
  editMode = false;

  selectedFile: any;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersServiceService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formInit();

    console.log(this.user);
    if (this.user) {
      this.editMode = true;
      this.patchForm(this.user);
    }
  }

  private formInit() {
    let eduArr = new FormArray([]);
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: [null, [Validators.required, requiredFileType(['png', 'jpg'])]],
      gender: [null, Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      nationality: ['Nepal', Validators.required],
      dob: ['', Validators.required],
      preferredModeOfContact: ['', Validators.required],
      edu: eduArr,
    });
  }

  private patchForm(user) {
    user.nationality.charAt(0).toUpperCase();
    console.log( user.nationality);
    this.userForm.patchValue({
      name: user.name,
      image: null,
      gender: user.gender,
      phone: user.phone,
      email: user.email,
      nationality: user.nationality,
      dob: user.dob,
      preferredModeOfContact: user.preferredModeOfContact,
    });

    this.user['educationBackground'].forEach(educationBackground => {
      (<FormArray>this.userForm.get('edu')).push(
        new FormGroup({
          education: new FormControl(educationBackground.education),
        })
      );
    })
  }




  get eduArray(): FormArray {
    return this.userForm.get('edu') as FormArray;
  }

  removeEdu(index: number) {
    (<FormArray>this.userForm.get('edu')).removeAt(index);
  }

  onAddEdu() {
    (<FormArray>this.userForm.get('edu')).push(
      new FormGroup({
        education: new FormControl(''),
      })
    );
  }

  getEdu() {
    return (<FormArray>this.userForm.get('edu')).controls;
  }

  submitUserInfo() {
    let body =this.userForm.get('edu').value;
    console.log(body, 'type ' , typeof(body))
    const formData = new FormData();
    formData.append('name', this.userForm.get('name').value);
    formData.append('image', this.userForm.get('image').value);
    formData.append('gender', this.userForm.get('gender').value);
    formData.append('phone', this.userForm.get('phone').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('nationality', this.userForm.get('nationality').value);
    formData.append('dob', this.userForm.get('dob').value);
    formData.append(
      'preferredModeOfContact',
      this.userForm.get('preferredModeOfContact').value
    );
    formData.append(
      'educationBackground',
      JSON.stringify(this.userForm.get('edu').value)
    );
    if (!this.editMode) {
      this.http.post('http://localhost:3000/api/users', formData).subscribe(
        (response) => {
          console.log(response);
          this.exit();
        },
        (error) => console.log(error)
      );
    } else {
      this.http
        .patch(`http://localhost:3000/api/users/${this.user._id}`, formData)
        .subscribe(
          (response) => {
            console.log(response);
            this.exit();
          },
          (error) => console.log(error)
        );
    }
  }

  getCountries() {
    return this.countryNames;
  }
  selectNationality(event: any) {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.userForm.patchValue({
      image: this.selectedFile,
    });
  }

  delete() {
    this.usersService.deleteUser(this.user._id).subscribe(
      (response) => {
        console.log(response);
        this.exit();
      },
      (error) => console.log(error)
    );
  }
  exit() {
    this.router.navigate(['/users']);
  }
  download() {}
}
