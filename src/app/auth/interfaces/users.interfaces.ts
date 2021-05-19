export interface AuthResponse {
  ok:    boolean;
  users?: User[];
  uid?:string;
  name?:string;
  email?: string;
  token?:string;
  msg?: string
}

export interface GetUserResponse {
  ok:   boolean;
  user: User;
}

export interface User {
  _id?:      string;
  uid?: string;
  name:     string;
  email:    string;
  password?: string;
  __v?:      number;
}

export interface GetUsersResponse {
  ok:    boolean;
  users: User[];
}
