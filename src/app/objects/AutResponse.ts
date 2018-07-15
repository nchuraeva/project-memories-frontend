export class AutResponse {
  access_token: string;
  refresh_token: string;
  username: string;
  roles: string[];

  constructor(access_token:string,refresh_token:string, username:string, roles:string[]) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.username = username;
    this.roles = roles;
  }
}
