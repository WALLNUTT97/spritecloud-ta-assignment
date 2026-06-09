export type SauceDemoCredentials = {
  username: string;
  password: string;
};

export interface DummyJSONCredentials {
  username: string;
  password: string;
  id: number;
  expiresInMins?: number; // optional, defaults to 60
}