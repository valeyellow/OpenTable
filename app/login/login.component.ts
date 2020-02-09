import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	err = '';

	constructor(private api: SignupService, private router: Router) {}

	ngOnInit() {
		this.loginForm = new FormGroup({
			username: new FormControl(null, Validators.required),
			password: new FormControl(null, Validators.required)
		});
	}

	loginUser() {
		if (this.loginForm.valid) {
			let user = {
				username: this.loginForm.value.username,
				password: this.loginForm.value.password
			};
			this.api.validateUser(user);

			if (this.api.userStatus === 'success') {
				this.router.navigateByUrl('/menu');
			} else if (this.api.userStatus === 'no user') {
				this.router.navigateByUrl('/register');
			}
		} else {
			this.err = 'Please fill all the fields!';
		}
	}
}
