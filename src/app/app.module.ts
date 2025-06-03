import { BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase)
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }