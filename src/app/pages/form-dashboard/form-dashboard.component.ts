import { Component, OnInit } from '@angular/core';
import { TfNgFormService, TfNgFormPermissionService, DisplayJsonService } from '@3t-transform/tf-ng-form';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-form-dashboard',
  templateUrl: './form-dashboard.component.html',
  styleUrls: ['./form-dashboard.component.less']
})
export class FormDashboardComponent implements OnInit {

  selectedDataType:string = null;
  selectedDataLoaded:boolean = false;
  submittedSubscription:Subscription;


  constructor(
    private formService:TfNgFormService,
    private formPermissionService:TfNgFormPermissionService,
    private displayJsonService:DisplayJsonService,
  ) { }

  ngOnInit(): void {
    // console.log("boom")
    // this.formPermissionService.formReadOnly = true;
  }

  onChange(value:string){
    this.selectedDataType = value;
  }

  showForm(){
    if(this.submittedSubscription){
      this.submittedSubscription.unsubscribe()
    }
    //
    this.selectedDataLoaded = false;
    //
    const url:string = `assets/forms/${this.selectedDataType}.json`
    this.formService.getData(url).subscribe(data => {
      this.submittedSubscription = this.formService.submitted.subscribe(
        submittedJSON => {
          this.onFormSubmitted(submittedJSON);
        }
      )
      //
      this.selectedDataLoaded = true;
      //
    }, err => {
      console.log("errored loading data in controllong app")
      console.log(err);
    })
  }

  onFormSubmitted(json:string){
    this.displayJsonService.show(json, this.selectedDataType);
  }


  onShowSourceData(){
    this.formService.data.pipe(take(1)).subscribe(
      data => {
        this.displayJsonService.show(JSON.stringify(data), `Source data: ${this.selectedDataType}`);
      }
    )

  }

  ngOnDestroy():void {
    if(this.submittedSubscription){
      this.submittedSubscription.unsubscribe();
    }
  }
}
