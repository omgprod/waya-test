import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor(
    public router:Router,
  ) { }

  ngOnInit(): void {
  }
  navigateToHome(){
    this.router.navigate(['se-connecter']).then(r => console.log(r))
  }
}
