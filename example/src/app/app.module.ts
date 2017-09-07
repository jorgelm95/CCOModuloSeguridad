import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SecurityModule } from './security/security.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';

// // Servicios del módulo de seguridad
// import { UserService } from './security/services/user.service';

//config
import { CONFIG } from './config/config'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecurityModule.forRoot(CONFIG)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
