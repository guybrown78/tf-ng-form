import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
	isOpened:boolean = false;
  constructor() { }

  ngOnInit() {
  }

	onClick(){
		this.isOpened = !this.isOpened;
	}
}
