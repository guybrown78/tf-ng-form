import { Component, OnInit } from '@angular/core';
import { TfNgFormService, TfNgFormPermissionService, DisplayJsonService } from 'tf-ng-form';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-real-form',
  template: `
    <tf-ng-form></tf-ng-form>
  `
})
export class RealFormComponent implements OnInit {
  submittedSubscription:Subscription;

  constructor(
    private formService:TfNgFormService,
    private formPermissionService:TfNgFormPermissionService,
    private displayJsonService:DisplayJsonService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    //
    this.route.paramMap.subscribe( paramMap => {
      const json = paramMap.get('json');
      this.initJson(json)
    }, err => {
      this.initJson('engineeringServiceLineCAF')
    })
  }

  initJson(json:string){
    json = json || 'engineeringServiceLineCAF'
    this.formService.getData(`assets/forms/${json}.json`).subscribe(data => {
      // data has loaded, the formService getData parses the data before it is returned here and stores the formFields, model and meta for the form.
      // only thing left to do is listen for the submit button to be pressed
      this.submittedSubscription = this.formService.submitted.subscribe(
        submittedJSON => {
          this.onFormSubmitted(submittedJSON);
        }
      )
    }, err => {
      // if the data can't load, then make the UI nice and show the user
      console.log("error loading data in controllong app")
      console.log(err);
    })
  }
  onFormSubmitted(json:string){
    console.log(json)
    // for dev purposes, display the json nicely
    this.displayJsonService.show(json, 'Default Data');
  }

  ngOnDestroy():void {
    // clean up the on submit listener
    if(this.submittedSubscription){
      this.submittedSubscription.unsubscribe();
    }
  }

}
