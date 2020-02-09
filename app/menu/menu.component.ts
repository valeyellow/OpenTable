import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { element } from 'protractor';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: [ './menu.component.css' ]
})
export class MenuComponent implements OnInit {
	constructor(private api: SignupService) {}

	cuisineList = [];            // stores ALL cuisines (including duplicates)
	selectedCuisine = '';        // stores the selected cuisine from drop down
	restaurantList = [];         // stores restaurants according to selected Cuisine
	uniqueList = [];            // stores only UNIQUE cuisines (filters out the duplicate cuisines)

	ngOnInit() {
		this.api.getCuisine().subscribe((res: any[]) => {
			this.cuisineList = res;

			//to filter out duplicate cuisines
			for (let i = 0; i < this.cuisineList.length; i++) {
				if (this.uniqueList.indexOf(this.cuisineList[i]['cuisine']) === -1) {
					this.uniqueList.push(this.cuisineList[i]['cuisine']);
				}
			}
		});
	}

	searchCuisines() {
		console.log(this.selectedCuisine);
		this.api.getRestaurantList(this.selectedCuisine).subscribe((res: any[]) => {
			this.restaurantList = res;
		});
	}
}
