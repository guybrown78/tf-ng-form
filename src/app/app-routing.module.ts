import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormDashboardComponent } from './pages/form-dashboard/form-dashboard.component';
import { DefaultDataComponent } from './pages/form-dashboard/default-data.component';
import { FromStateComponent } from './pages/form-dashboard/from-state.component';
import { CreateJsonComponent } from './pages/create-json/create-json.component';

const routes: Routes = [
  { path:"", component:DashboardComponent, data:{}},
  { path:"home", component:DashboardComponent, data:{}},
  { path:"form-default", component:DefaultDataComponent, data:{}},
  { path:"create-json", component:CreateJsonComponent, data:{}},
  { path:"form-state", component:FromStateComponent, data:{}},
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

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
