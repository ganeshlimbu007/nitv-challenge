import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersServiceService } from '../shared/users-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersServiceService
  ) {}
  users: any;

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((response) => {
      const { users } = response;
      this.users = users;
      this.loading = false;
    });
  }

  createUser() {
    console.log('hello there');
    this.router.navigate(['../create'], { relativeTo: this.route });
  }
  editUser(id: any) {
    this.router.navigate([`../${id}/edit`], { relativeTo: this.route });
  }
}
