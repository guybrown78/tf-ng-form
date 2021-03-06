import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TfNgFormService, DisplayJsonService } from '@3t-transform/tf-ng-form';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-auto-save',
  template: `
    <tf-ng-card>
      <tf-ng-card-content>
        <h4 nz-typography class="blue">Autosave Form</h4>
        <p nz-typography>If <span class="blue italic">allowAutoSave</span> is set in the TfNgFormService, the rendered form will check the validation on each field that is updated. If the field is valid, the rendered form will emit the <span class="blue italic">autosave</span> observable passing the updated model</p>
      </tf-ng-card-content>
    </tf-ng-card>
    <tf-ng-form></tf-ng-form>
  `
})
export class AutoSaveComponent implements OnInit {
  submittedSubscription:Subscription;
  autosaveSubscription:Subscription;
  constructor(
    private formService:TfNgFormService,
    private displayJsonService:DisplayJsonService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.formService.allowAutoSave = true;
    this.formService.getData('assets/forms/simple-validation.json').subscribe(data => {

      this.autosaveSubscription = this.formService.autosave.subscribe(
        autosaveJSON => {
          this.onFormAutoSave(autosaveJSON)
        }
      )
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

  onFormAutoSave(json:string){
    console.log(json)
    this.message.create('success', `The form model auto saved`);
  }

  onFormSubmitted(json:string){
    this.displayJsonService.show(json, 'Default Data');
  }

  ngOnDestroy():void {
    this.formService.allowAutoSave = false;
    if(this.submittedSubscription){
      this.submittedSubscription.unsubscribe();
    }
  }

}
