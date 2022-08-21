import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { UsersComponent } from './components/users/users.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AccountComponent } from './components/account/account.component';
import { UserComponent } from './components/user/user.component';
import { HotToastModule } from '@ngneat/hot-toast';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    AccountComponent,
    UserComponent
  ],
  imports: [
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,

    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),

    BrowserModule,
    BrowserAnimationsModule,

    ReactiveFormsModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
