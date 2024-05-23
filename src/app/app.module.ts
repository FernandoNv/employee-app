import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './shared/header/header.component';

const appComponents = [HeaderComponent];
const ngModules = [BrowserModule, AppRoutingModule];

@NgModule({
  declarations: [AppComponent],
  imports: [...ngModules, ...appComponents],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
