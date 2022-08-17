import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../shared/auth.service';

type Person = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    roles: Array<string>;
}
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  currentUser: Person;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.currentUser = {
      id : "",
      username : "",
      phone : "",
      firstName : "",
      lastName : "",
      email : "",
      roles: [],
    };
  }

  logout() {
    this.authService.doLogout();
  }

  async ngOnInit(): Promise<void> {
    let user: any = await localStorage.getItem('user');
    user = JSON.parse(user);
    this.authService.getUserProfile(user.id).subscribe(res => {
      if(res !== undefined){
        console.log(res)
        const id: string = res._id;
        const username: string = res.Username;
        const phone: string = res.Phone;
        const firstName: string = res.FirstName;
        const lastName: string = res.LastName;
        const email: string = res.Email;
        const roles: Array<string> = res.Roles;
        this.currentUser= {
          id,
          username,
          phone,
          firstName,
          lastName,
          email,
          roles,
        };
      }
    });
  }

}
