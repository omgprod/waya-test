import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-angular';
  showForm = false;

  showLogForm(){
    return this.showForm = !this.showForm;
  }
}
