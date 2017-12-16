/**
 * Created by opaluwa john on 12/16/2017.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ContactUsService} from './contact-us.service';
import {AuthenticationService} from './authentication.service';
import {ValidateService} from './validate.service';

const SERVICES = [
  ContactUsService,
  AuthenticationService,
  ValidateService
]

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [...SERVICES]
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServiceModule,
      providers: [
        ...SERVICES
      ]
    };
  }
}

