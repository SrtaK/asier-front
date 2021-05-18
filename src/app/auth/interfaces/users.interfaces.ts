export interface AuthResponse {
  ok:    boolean;
  users?: User[];
  uid?:string;
  name?:string;
  email?: string;
  token?:string;
  msg?: string
}

export interface User {
  _id?:      string;
  uid?: string;
  name:     string;
  email:    string;
  password?: string;
  __v?:      number;
}


