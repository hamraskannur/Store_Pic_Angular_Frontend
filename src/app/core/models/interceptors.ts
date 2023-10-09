export interface AuthResponse {
    message: string;
    status: Boolean;
    token:string
  }

export interface User{
  _id:string
  username:string
  email:string
  status:boolean
}