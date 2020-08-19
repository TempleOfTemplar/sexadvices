import {Component} from '@angular/core';
import {authCodeFlowConfig} from "../auth-code-flow.config";
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";

const useHash = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'virtual-mistress-app';

  constructor(private router: Router, private oauthService: OAuthService) {
    this.configureCodeFlow();
  }

  private configureCodeFlow(): void {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.initCodeFlow();
    this.oauthService.initLoginFlow();
    this.oauthService.tryLogin().then(_ => {
      console.log("WTF", _);
      if (useHash) {
        this.router.navigate(['/']);
      }
    });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
  }
}
