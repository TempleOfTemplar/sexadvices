import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppHeaderComponent} from "./components/app-header/app-header.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {AddSuggestionPageComponent} from "./pages/add-suggestion-page/add-suggestion-page.component";
import {SuggestionsPageComponent} from "./pages/suggestions-page/suggestions-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NullValidationHandler, OAuthModule, OAuthStorage, ValidationHandler} from "angular-oauth2-oidc";
import {AuthService} from "./services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SuggestionsPageComponent,
    AddSuggestionPageComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    OAuthModule.forRoot(
      {
        resourceServer: {
          allowedUrls: ['http://127.0.0.1:8000/', 'http://127.0.0.1:8000/o', 'http://127.0.0.1:8000/api'],
          sendAccessToken: true
        }
      }
    )
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => () => injector.get<AuthService>(AuthService).ensureAuthentication(),
      deps: [Injector],
      multi: true
    },
    // {provide: ValidationHandler, useClass: NullValidationHandler},
    {provide: OAuthStorage, useValue: localStorage},
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
