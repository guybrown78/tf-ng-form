import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isUserAccountsMenuOpen:boolean = false;
  titleVisible:boolean = true;
  constructor() { }

  ngOnInit() {
    document.addEventListener("click", (event:MouseEvent) => this.handleClickOutside(event));
  }

  onUserAccountsMenuToggle(isOpen:boolean){
		this.isUserAccountsMenuOpen = isOpen;
  }

  handleClickOutside(event:MouseEvent){
    if(this.isUserAccountsMenuOpen){
      const isInEl:boolean = this.isNodeWithinAppHeaderClientLogo(event.target);
      if(!isInEl){
        this.isUserAccountsMenuOpen = false;
      }
    }
  }
  isNodeWithinAppHeaderClientLogo(child):boolean{
    let node = child.parentNode;
    while (node != null) {
        if (node.id === "tfAppHeaderClientLogo") {
          return true;
        }
        node = node.parentNode;
    }
    return false;
  }

  onHeaderIconClicked(){
    this.titleVisible = !this.titleVisible;
  }
	ngOnDestroy() {
    document.removeEventListener("click", (event:MouseEvent) => this.handleClickOutside(event));
  }

}
