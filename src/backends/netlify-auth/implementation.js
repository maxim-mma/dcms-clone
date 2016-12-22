import NetlifyAuthClient from 'netlify-auth-js';
import GitHubBackend from '../github/implementation';
import API from './API';
import AuthenticationPage from './AuthenticationPage';

export default class NetlifyAuth extends GitHubBackend {
  constructor(config) {
    super(config, true);
    if (config.getIn(['backend', 'auth_url']) == null)
      throw new Error('The NetlifyAuth backend needs an "auth_url" in the backend configuration.');

    if (config.getIn(['backend', 'github_proxy_url']) == null)
      throw new Error('The NetlifyAuth backend needs an "github_proxy_url" in the backend configuration.');

    this.github_proxy_url = config.getIn(['backend', 'github_proxy_url']);

    this.authClient = new NetlifyAuthClient({
      APIUrl: config.getIn(['backend', 'auth_url']),
    });

    AuthenticationPage.authClient = this.authClient;
  }

  setUser() {
    const user = this.authClient.currentUser();
    if (!user) return Promise.reject();

    return this.authenticate(user);
  }

  authenticate(user) {
    return user.jwt().then((token) => {
      this.api = new API({ api_root: this.github_proxy_url, jwtToken: token });
      return { ...user.user_metadata };
    });
  }

  authComponent() {
    return AuthenticationPage;
  }

}
