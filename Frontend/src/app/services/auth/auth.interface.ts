export interface User {
  id: number;
  fullName: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

// signup
export interface UserInput {
  email: string;
  password: string;
  fullName: string;
  address: string;
}
// login
export interface UserLogInInput {
  email: string;
  password: string;
}
// token
export interface JWTPayload {
  data: {
    accessToken: string;
    id: string;
    expiresAt: Date;
  };
}
