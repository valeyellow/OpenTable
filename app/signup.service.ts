import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SignupService {
	constructor(private http: HttpClient) {}
	baseUrl = 'http://localhost:3003';
	userStatus: string = '';

	validateUser(user) {
		this.http.post(this.baseUrl + '/user', user).subscribe((responseData) => {
			this.userStatus = responseData['status'];
			alert(responseData['msg']);
		});
	}

	registerUser(user) {
		this.http.post(this.baseUrl + '/addUser', user).subscribe((responseData) => {
			alert(responseData['msg']);
		});
	}

	getCuisine() {
		return this.http.get(this.baseUrl + '/cuisine');
	}

	getRestaurantList(cuisine) {
		return this.http.get(this.baseUrl + '/cuisine/' + cuisine);
	}
}
