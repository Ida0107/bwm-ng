import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { provideForRootGuard } from '@angular/router/src/router_module';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const routes : Routes = [
  {path: '', redirectTo: '/rentals', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    RentalModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
