import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
	declarations: [ AppComponent, LoginComponent, RegisterComponent, MenuComponent, PageNotFoundComponent ],
	imports: [ BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule,FormsModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
