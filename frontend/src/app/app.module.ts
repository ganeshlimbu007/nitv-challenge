import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthenticationModule, // Eager loaded since we may need to go here right away as browser loads based on route user enters
    AppRoutingModule, // Main routes for application
    SharedModule, // Shared (multi-instance) objects
    CoreModule, // Singleton objects (services, components that are loaded only once, etc.)
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
