import { Component, OnInit } from '@angular/core';
import { TfNgFormService, TfNgFormPermissionService, DisplayJsonService } from '@3t-transform/tf-ng-form';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default-data',
  template: `
    <tf-ng-form></tf-ng-form>
  `
})
export class DefaultDataComponent implements OnInit {
  submittedSubscription:Subscription;

  constructor(
    private formService:TfNgFormService,
    private formPermissionService:TfNgFormPermissionService,
    private displayJsonService:DisplayJsonService,
  ) { }

  ngOnInit(): void {
    //
    this.formService.getData('assets/forms/simple.json').subscribe(data => {
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
