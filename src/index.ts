import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GrowlComponent} from './growl.component';
import {GrowlService} from './growl.service';
import {GrowlConfig} from './growl.config';
export {GrowlComponent} from './growl.component';
export {GrowlService} from './growl.service';

@NgModule({
  imports: [CommonModule],
  declarations: [GrowlComponent],
  exports: [GrowlComponent],
  providers: [GrowlService]
})


export class GrowlModule {
  static forRoot(config: GrowlConfig = {displayTimeMs: 5000}): ModuleWithProviders {
    return {
      ngModule: GrowlModule,
      providers: [
        {provide: GrowlConfig, useValue: config},
        GrowlService
      ]
    };
  }
}