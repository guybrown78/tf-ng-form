import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { TfNgFormService, DisplayJsonService } from '@3t-transform/tf-ng-form';

@Component({
  selector: 'app-create-json',
  templateUrl: './create-json.component.html',
  styleUrls: ['./create-json.component.less']
})
export class CreateJsonComponent implements OnInit {

  dataSubscription:Subscription
  jsonForm: FormGroup;
  loading:boolean = false;
  saved:boolean = false;
  error:boolean = false;
  defaultMeta = {
    title:"Simple",
    version:1,
    description:"Lorum ipsum ...",
    jsonSchema:true
  }

  starterSchema = [{
    "label": "Name",
    "type": "input"
  },
  {
    "type": "divider"
  },
  {
    "label": "Email",
    "type": "input",
    "help":"Lorum ipsum"
  },
  {
    "label":"Function",
    "type":"radio",
    "componentOptions":{
      "options":[
        {
          "label":"Originate",
          "value":"originate"
        },
        {
          "label":"Check",
          "value":"check"
        },
        {
          "label":"Approve",
          "value":"approve"
        },
        {
          "label":"Other",
          "value":"other"
        }
      ]
    }
  }
  ]

  constructor(
    private formService:TfNgFormService,
    private displayJsonService:DisplayJsonService,
  ) { }


  ngOnInit(): void {


    // JSON.stringify(JSON.parse(data), null, 2))
    this.jsonForm = new FormGroup({
      meta:new FormControl(
        JSON.stringify(this.defaultMeta, null, 2),{
          validators: [ Validators.required ]
      }),
      schema:new FormControl(
        JSON.stringify(this.starterSchema, null, 2),{
        validators: [ Validators.required ]
      }),
      model:new FormControl(
        null,{
        validators: [ Validators.required ]
      })
    })
  }

  submitForm(): void {
    this.jsonForm.disable();
    this.loading = true;
    this.saved = false;
    this.error = false;
    //
    const json = this.getJsonFromForm()
    this.formService.nullifyData();
    this.formService.setData(JSON.stringify(json)).subscribe(data => {
      // read get 1 take of the stored data
      this.formService.data.pipe(take(1)).subscribe(
        data => {
          console.log("complete")
          console.log(data);
          setTimeout(() => {
            this.jsonForm.enable();
            this.loading = false;
            this.saved = true;
          }, 500)

        }, dataErr => {
          //
          console.log("error")
          this.jsonForm.enable();
          this.loading = false;
          // show error message
          this.error = true;
        }
      )
    })

  }

  onPreviewJson(){
    const json = this.getJsonFromForm()
    this.displayJsonService.show(JSON.stringify(json), 'Default Data');
  }

  getJsonFromForm(){
    const { meta, schema, model } = this.jsonForm.value;
    return {
      meta:JSON.parse(meta) || {},
      schema:JSON.parse(schema) || {},
      model:JSON.parse(model) || {},
    }
  }

}
