import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  currentUser: Object | null = {};
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let user = localStorage.getItem('user');
    console.log(JSON.stringify(user))
    //this.currentUser = user;
  }

  async ngOnInit(): Promise<void> {
    const user = await localStorage.getItem('user');
    // @ts-ignore
    this.currentUser = JSON.parse(user)

  }

}
