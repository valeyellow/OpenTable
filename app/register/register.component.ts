import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	registerUser: FormGroup;
	err = '';
	constructor(private api: SignupService, private router: Router) {}

	ngOnInit() {
		this.registerUser = new FormGroup({
			username: new FormControl(null, Validators.required),
			password: new FormControl(null, Validators.required),
			confirmPwd: new FormControl(null, Validators.required)
		});
	}

	onSubmit() {
		if (this.registerUser.valid) {
			if (this.registerUser.value.password !== this.registerUser.value.confirmPwd) {
				this.err = 'Passwords do not match!';
			} else {
				let user = {
					username: this.registerUser.value.username,
					password: this.registerUser.value.password
				};
				this.api.registerUser(user);
				this.router.navigateByUrl('/login');
			}
		} else {
			this.err = 'Please fill all the fields!';
		}
	}
}
