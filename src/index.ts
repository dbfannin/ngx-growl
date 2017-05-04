import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GrowlComponent} from './growl.component';
import {GrowlService} from './growl.service';

@NgModule({
  imports: [CommonModule],
  declarations: [GrowlComponent],
  exports: [GrowlComponent],
  providers: [GrowlService]
})


export class GrowlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GrowlModule,
      providers: [GrowlService]
    };
  }
}