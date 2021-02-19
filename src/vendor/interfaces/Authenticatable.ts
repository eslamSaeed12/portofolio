export interface Authenticatble {
  authenticate(username: string, password: string, remember: boolean): boolean;
}
