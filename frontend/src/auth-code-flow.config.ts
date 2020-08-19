import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider

  issuer: 'http://localhost:8000',
  loginUrl: 'http://localhost:8000/o/authorize',
  // logoutUrl: 'https://demo.identityserver.io/connect/endsession',
  tokenEndpoint: 'http://localhost:8000/o/token',
  revocationEndpoint: 'http://localhost:8000/o/revoke_token',
  // sessionCheckIFrameUrl: 'https://demo.identityserver.io/connect/checksession',
  // userinfoEndpoint: 'https://demo.identityserver.io/connect/userinfo',
  skipIssuerCheck: true,
  disablePKCE: true,
  requireHttps: false,
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/auth-callback',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'virtual-mistress',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'id_token token',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'suggestions items categories',
  silentRefreshShowIFrame: false,

  silentRefreshRedirectUri: `${window.location.origin}/silent-refresh.html`,
  useSilentRefresh: true,
  showDebugInformation: true,
};

