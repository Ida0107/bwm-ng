
import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
      MapComponent
  ],
  exports: [
      MapComponent
    //   We export the ContactComponent so other modules that import the ContactModule can include it in their component templates
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey:'AIzaSyDgmwgHLJqdq_ycS5hSJxE5GvGEbc62MrE'
      }),
    CommonModule
  ],
  providers: [
    MapService,
    CamelizePipe
],
  
})
export class MapModule { }
