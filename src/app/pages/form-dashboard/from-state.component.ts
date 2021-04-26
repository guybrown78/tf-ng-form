import { Component, OnInit } from '@angular/core';
import { TfNgFormService, DisplayJsonService } from 'tf-ng-form';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-from-state',
  template: `
    <tf-ng-form></tf-ng-form>
  `
})
export class FromStateComponent implements OnInit {

  submittedSubscription:Subscription;

  constructor(
    private formService:TfNgFormService,
    private displayJsonService:DisplayJsonService,
  ) { }

  ngOnInit(): void {
    this.submittedSubscription = this.formService.submitted.subscribe(
      submittedJSON => {
        this.onFormSubmitted(submittedJSON);
      }
    )
  }


  onFormSubmitted(json:string){
    this.displayJsonService.show(json, 'Default Data');
  }

  ngOnDestroy():void {
    if(this.submittedSubscription){
      this.submittedSubscription.unsubscribe();
    }
  }

}
