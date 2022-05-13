import { Component, OnInit } from '@angular/core';
import { TfNgFormService, TfNgFormPermissionService, TfNgFormPermissionInterface, DisplayJsonService } from '@3t-transform/tf-ng-form';
import { pipe, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.less']
})
export class GridsComponent implements OnInit {

  gridCol:number
  gridColSpan:string

  selectedDataType:string = null;
  selectedDataLoaded:boolean = false;
  submittedSubscription:Subscription;

  constructor(
    private formService:TfNgFormService,
    private formPermissionService:TfNgFormPermissionService,
    private displayJsonService:DisplayJsonService
  ) { }

  ngOnInit(): void {
  }

  onChangeGrid(col, span){
    this.gridCol = col;
    this.gridColSpan = span;
    this.showForm();
  }

  showForm(){
    if(this.submittedSubscription){
      this.submittedSubscription.unsubscribe()
    }
    //
    this.selectedDataLoaded = false;
    //
    const url:string = `assets/grids/grid-${this.gridCol}_${this.gridColSpan}.json`
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
