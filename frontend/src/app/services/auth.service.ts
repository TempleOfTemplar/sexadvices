import {Injectable} from '@angular/core';
import {OAuthService, UserInfo} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MemorySubject} from '../extensions/MemorySubject';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';
import {authCodeFlowConfig} from "../../auth-code-flow.config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private discoveryDocument: object;

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {
    // setup oauthService
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // запускаем автоматичекий silent-signin
    this.oauthService.setupAutomaticSilentRefresh();
  }

  private _currentUser$ = new MemorySubject<UserInfo>();

  get currentUser$(): Observable<UserInfo | undefined> {
    return this._currentUser$;
  }

  currentUserSnapshot(): UserInfo | undefined {
    return this._currentUser$.value;
  }

  async ensureAuthentication(): Promise<any> {
    if (!this.isLoggedIn()) {
      try {
        // await this.loadDiscoveryDocument()
        const loggedInSuccessfully = await this.oauthService.tryLogin();
        if (loggedInSuccessfully) {
          await this.updateCurrentUser();
          // TODO
          this.restoreState();
          // https://blog.akquinet.de/2020/01/06/angular-opendid-a-real-world-example/
          return loggedInSuccessfully;
        } else {
          const silentlyLoggedIdSuccessfully = await this.oauthService.silentRefresh();
          await this.updateCurrentUser();
          return silentlyLoggedIdSuccessfully;
        }
      } catch (e) {
        // не удалось войти через hash. редирект в паспорт
        this.oauthService.initImplicitFlow(this.router.url);
        return new Promise(() => {
        });
      }
    } else if (!this.currentUserSnapshot()) {
      await this.updateCurrentUser();
    }
  }

  getToken(): string {
    return this.oauthService.getAccessToken();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  logout() {
    this.oauthService.logOut();
  }

  async updateCurrentUser() {
    // try {
    //   const data = await this.oauthService.loadUserProfile();
    //   this.oidcUser = {
    //     login: data.sub || '',
    //     name: data.name || '',
    //     avatarUrl: data.picture || '',
    //     profileUrl: data.profile || ''
    //   };
    // } catch (e) {
    //   console.error('Не удалось получить текущего Oidc пользователя: ', e);
    // }
    // this.currentUser$.subscribe(currentUser => {
    //   // TODO ask for permissions API
    //   // const roles = currentUser.roles.map(role => UserRole[role]);
    //   // this.permissionsService.loadPermissions(roles);
    //   console.log("currentUser", currentUser);
    // }, error => {
    //   console.error('current user fetch error: ', error);
    // });
    try {
      // const data = await this.usersService.getCurrentUser();
      // this._currentUser$.next(data);
    } catch (e) {
      console.error('Не удалось получить текущего пользователя: ', e);
    }
  }

  private async loadDiscoveryDocument(): Promise<object> {
    try {
      if (!this.discoveryDocument) {
        this.discoveryDocument = await this.oauthService.loadDiscoveryDocument();
        return this.discoveryDocument;
      }
      return this.discoveryDocument;
    } catch (e) {
      console.error('Не удалось загрузить discovery document', e);
      return e;
    }
  }

  private restoreState() {
    if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
      this.router.navigateByUrl(this.oauthService.state);
    }
  }
}
