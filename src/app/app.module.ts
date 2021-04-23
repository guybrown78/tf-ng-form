import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TfNgCoreModule } from 'tf-ng-core';
import { TfNgNzModule } from 'tf-ng-nz';
import { TfNgFormModule } from 'tf-ng-form';


import { NgZorroModule } from './modules/ng-zorro.module'
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_GB } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';


import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormDashboardComponent } from './pages/form-dashboard/form-dashboard.component';
import { DefaultDataComponent } from './pages/form-dashboard/default-data.component';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    DashboardComponent,
    FormDashboardComponent,
    DefaultDataComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TfNgCoreModule,
    TfNgNzModule,
    TfNgFormModule,
    NgZorroModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_GB }],
  bootstrap: [AppComponent]
})
export class AppModule { }
