import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersServiceService } from '../shared/users-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user: any;
  id: any;
  loading = true;

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UsersServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      console.log(this.id);
      this.getUser(this.id);
    });

  }

  getUser(id: any) {
    this.usersService.getUsers().subscribe(
      response =>  {
        const { users } = response;
        console.log(users);
        this.user = users.find(user => user._id === id );
        if(!this.user) {
         return this.redirectToUsers();
        }
        this.loading = false;
      }
    )
  }


  redirectToUsers() {
    this.router.navigate(['/users']);
  }

}
