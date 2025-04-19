import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
***REMOVED***
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase)
***REMOVED***
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }