import { Component, OnInit } from '@angular/core';
import { TfNgFormService, TfNgFormPermissionService, TfNgFormPermissionInterface, DisplayJsonService } from 'tf-ng-form';
import { pipe, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-permissions',
  template: `
    <tf-ng-card *ngIf="permissions.length">
      <tf-ng-card-content>
        <span nz-typography class="blue">Select user permissions: </span>
        <nz-select nzPlaceHolder="Select User Permissions..." [(ngModel)]="selectedPermission" (ngModelChange)="onChange($event)" >
          <nz-option *ngFor="let p of permissions" [nzLabel]="p.label" [nzValue]="p.level"></nz-option>
        </nz-select>
      </tf-ng-card-content>
    </tf-ng-card>
     <tf-ng-form></tf-ng-form>
  `
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

    this.formPermissionService.userPermissions.pipe(take(1)).subscribe( permissions => {
      this.permissions = permissions;
      this.selectedPermission = this.permissions[0];
      // set permission
      this.formPermissionService.setUserPermissionLevel(this.selectedPermission.level);
    })
  }

  onChange(value){
    this.formPermissionService.setUserPermissionLevel(value);
    this.ngOnDestroy()
    this.formService.nullifyData().pipe(take(1)).subscribe(
      nullified => {
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
    this.displayJsonService.show(json, 'Dedault Data');
    //
  }

  ngOnDestroy():void {
    // clean up the on submit listener
    if(this.submittedSubscription){
      this.submittedSubscription.unsubscribe();
    }
  }


}
