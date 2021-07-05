import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormDashboardComponent } from './pages/form-dashboard/form-dashboard.component';
import { DefaultDataComponent } from './pages/form-dashboard/default-data.component';
import { RealFormComponent } from './pages/form-dashboard/real-form.component'
import { FromStateComponent } from './pages/form-dashboard/from-state.component';
import { AutoSaveComponent } from './pages/form-dashboard/auto-save.component';
import { PermissionsComponent } from './pages/form-dashboard/permissions.component'
import { GridsComponent } from './pages/grids/grids.component'

import { CreateJsonComponent } from './pages/create-json/create-json.component';

import { RichTextComponent } from './pages/editor/rich-text/rich-text.component'
import { NewSchemaComponent } from './pages/form-dashboard/new-schema.component';

const routes: Routes = [
  // { path:"", component:FormDashboardComponent, data:{}},
  { path:"home", component:DashboardComponent, data:{}},
  { path:"form-default", component:DefaultDataComponent, data:{}},
  { path:"create-json", component:CreateJsonComponent, data:{}},
  { path:"form-state", component:FromStateComponent, data:{}},
  { path:"auto-save", component:AutoSaveComponent, data:{}},
  { path:"real", component:RealFormComponent, data:{}},
  { path:"real/:json", component:RealFormComponent, data:{}},
  { path:"new-schema", component:NewSchemaComponent, data:{}},

  { path:"permissions", component:PermissionsComponent, data:{}},
  { path:"grids", component:GridsComponent, data:{}},

  { path:"form", component:FormDashboardComponent, data:{}},
  { path: 'inputs', component: FormDashboardComponent, data:{} },
	{ path: 'file-select', component: FormDashboardComponent, data:{} },
	{ path: 'date-picker', component: FormDashboardComponent, data:{} },
	{ path: 'form-elements', component: FormDashboardComponent, data:{} },
	{ path: 'login', component: FormDashboardComponent, data:{
		appTitle : 'Transform',
		appCode : 't',
		isLogoClickable:false,
    showAppLogo:true,
    quickLinks:[]
	}},
	{ path: 'reactive-form', component: FormDashboardComponent, data:{} },
  { path: 'rich-text', component: RichTextComponent},
  { path: '**', redirectTo: '/form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
