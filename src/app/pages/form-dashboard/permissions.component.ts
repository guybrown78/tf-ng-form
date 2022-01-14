import { Component, OnInit } from '@angular/core';
import { TfNgFormService, TfNgFormPermissionService, TfNgFormPermissionInterface, DisplayJsonService } from 'tf-ng-form';
import { pipe, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-permissions',
  template: `
    <tf-ng-card *ngIf="permissions.length">
      <tf-ng-card-content class="intro">

        <p>See app.component.ts for the default permissions and initialising them in tf-ng-form. Labels can be bespoke and set from config or editable by client</p>

      </tf-ng-card-content>
      <tf-ng-card-content>
        <span nz-typography class="blue">Select user permissions: </span>
        <nz-select nzPlaceHolder="Select User Permissions..." [(ngModel)]="selectedPermission" (ngModelChange)="onChange($event)" >
          <nz-option *ngFor="let p of permissions" [nzLabel]="p.level +': '+ p.label" [nzValue]="p.level"></nz-option>
        </nz-select>
          <button nz-button nzSize="small" class="show-source-json aqua" (click)="onShowSourceData()">
            <i nz-icon nzType="code" nzTheme="outline"></i>
          </button>
      </tf-ng-card-content>
    </tf-ng-card>
     <tf-ng-form></tf-ng-form>
  `,
  styles: [`
    .intro{
      display:block;
      margin-bottom: 10px;
    }
    .show-source-json{
      float: right;
    }
    .show-source-json::after {
      content: "";
      clear: both;
      display: table;
    }
  `]
})
export class PermissionsComponent implements OnInit {
  submittedSubscription:Subscription;
  selectedPermission:TfNgFormPermissionInterface;
  permissions:TfNgFormPermissionInterface[];

  constructor(
    private formService:TfNgFormService,
    private formPermissionService:TfNgFormPermissionService,
    private displayJsonService:DisplayJsonService
  ) { }

  ngOnInit(): void {
    // reset the data
    this.formService.nullifyData().pipe(take(1)).subscribe(
      nullified => {
        // get the available permissions
        this.formPermissionService.userPermissions.pipe(take(1)).subscribe( permissions => {
          this.permissions = permissions;
          this.selectedPermission = this.permissions[0];
          // set a default permission in service
          this.formPermissionService.setUserPermissionLevel(this.selectedPermission.level);
        })
      }
    )


  }

  onChange(value){

    this.ngOnDestroy()
    // reset the data
    this.formService.nullifyData().pipe(take(1)).subscribe(
      nullified => {
        // set the permission in service
        this.formPermissionService.setUserPermissionLevel(value);
        // load data and set
        this.formService.getData('assets/forms/permissions.json').subscribe(data => {
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
    )
  }

  onFormSubmitted(json:string){
    console.log(json)
    // for dev purposes, display the json nicely
    this.displayJsonService.show(json, 'Default Data');
    //
  }

  onShowSourceData(){
    this.formService.data.pipe(take(1)).subscribe(
      data => {
        this.displayJsonService.show(JSON.stringify(data), 'Permissions sample data');
      }
    )

  }

  ngOnDestroy():void {
    // clean up the on submit listener
    if(this.submittedSubscription){
      this.submittedSubscription.unsubscribe();
    }
  }


}
