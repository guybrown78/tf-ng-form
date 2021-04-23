import { Component, OnInit } from '@angular/core';

import { QuickLinksItem, QuickLinksService, AppHeaderService } from 'tf-ng-nz';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{

  appTitle:string = "Learning Management"

  appList:any[] = [
    {name:'Competance Management', code:'cm'},
    {name:'Learning Management', code:'lm'},
    {name:'Training Management', code:'tm'},
  ]
  discoverAppList:any[] = [
    {name:'R3 Demo', code:'r3'},
    {name:'VR Digital Twin Preview', code:'vr'},
  ]

  isSignOutModalVisible:boolean = false;

  constructor(
    private quickLinksService:QuickLinksService,
    private appHeaderService:AppHeaderService
  ) {}

  ngOnInit(): void {
    // to do when app data/config is realises, or on route change!
    this.quickLinksService.setData(
      [{
        value:"add-user",
        title:"Add a user",
        routePaths:["/"]
      },
      {
        value:"add-course",
        title:"Add a course",
        routePaths:["/"]
      },
      {
        value:"ql1",
        title:"Use Action Handler",
        actionHandler: (item:QuickLinksItem) => this.onQLActionTest(item)
      },]
    )
    // listen and handle to any clicks from the quick links dropdown menu
    this.quickLinksService.itemSelected.subscribe(item => {
      if(item){
        this.onQuickLinkItemClicked(item)
      }
    })
    //
    this.appHeaderService.setOptions({
      appCode:'t',
      appTitle:this.appTitle,
      clientLogoSource:'https://logodix.com/logo/80482.png',
      userAccountIcon:'logout',
      showUserDropdown:false,
    })

    // listen and handle confirmed signout from header modal
    this.appHeaderService.signoutConfirmed.subscribe(
      confirmed => {
        console.log("Sign out confirmed, tell identity")
      }
    );
  }

  onQuickLinkItemClicked(item:QuickLinksItem){
    console.log(" >> QuickLink item has been selected <<")
    console.log(item)
    if(item.actionHandler){
      item.actionHandler(item);
      return;
    }
    if(item.routePaths){
      // this.router.navigate(item.routePaths)
      return;
    }
    if(item.url){
      window.open(item.url);
      return;
    }
  }

  onQLActionTest(item:QuickLinksItem){
    console.log("QL Action", item.value);
  }

}
