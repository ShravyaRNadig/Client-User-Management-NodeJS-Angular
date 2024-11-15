import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // <-- Add this import

@NgModule({
  declarations: [
    AppComponent,
    ClientManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ClientManagementComponent },  // Default route
      { path: 'clients', component: ClientManagementComponent }  // Another route, for example
    ]) // <-- Add this to configure routing, even if you don't have any routes yet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
