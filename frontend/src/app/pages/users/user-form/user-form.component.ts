import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Countries } from '../shared/constants/countries';
import { UsersServiceService } from '../shared/users-service.service';
import { requiredFileType } from '../shared/custom-validation/requireFileType';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

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
  imageLabel = 'Add image';
  submitted = false;
  imageError = false;
  imageInvalid = false;

  imageChangedInEdit = false;

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
      this.imageLabel = 'Update Image';
    }
  }

  private formInit() {
    let eduArr = new FormArray([]);
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: [null],
      gender: [null, Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationality: ['Nepal', Validators.required],
      dob: ['', Validators.required],
      preferredModeOfContact: ['', Validators.required],
      edu: eduArr,
    });
  }

  private patchForm(user) {
    user.nationality.charAt(0).toUpperCase();
    console.log(user.nationality);
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

    this.user['educationBackground'].forEach((educationBackground) => {
      (<FormArray>this.userForm.get('edu')).push(
        new FormGroup({
          education: new FormControl(educationBackground.education),
        })
      );
    });
  }

  get formUser() {
    return this.userForm.controls;
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
    console.log(this.userForm.valid, ': validity');
    this.submitted = true;
    this.imageError = false;
    this.imageInvalid = false;
    const image = this.userForm.get('image').value;
    if(!this.editMode || this.imageChangedInEdit) {
      if (!image) {
        this.imageError = true;
        return;
      }

      this.checkExtension();
    }

    if(this.userForm.invalid || this.imageError || this.imageInvalid ) {
      return;
    }
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

  checkExtension() {
    const file = this.userForm.get('image').value.name;
    const extension = file.split('.')[1].toLowerCase();
    if (extension === 'png' || extension === 'jpg') {
      this.imageInvalid = false;
      return;
    }
    this.imageInvalid = true;
    return;
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
    if(this.editMode) {
      this.imageChangedInEdit = true;
    }
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
  download() {
    this.downloadFileAsCSV();
  }

  downloadFileAsCSV() {
    let data = [
      {
        name: this.userForm.get('name').value,
        DOB: this.userForm.get('dob').value,
        Gender: this.userForm.get('gender').value,
        Phone: this.userForm.get('phone').value,
        Email: this.userForm.get('email').value,
        Nationality: this.userForm.get('nationality').value,
        Preferred_Mode_Of_Contact: this.userForm.get('preferredModeOfContact')
          .value,
      },
    ];
    let options: any = {
      title: 'User Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: [
        'Name',
        'DOB',
        'Gender',
        'Phone',
        'Email',
        'Nationality',
        'Mode Of Contact',
      ],
    };

    new Angular2Csv(data, 'user_info', options);
  }
}
