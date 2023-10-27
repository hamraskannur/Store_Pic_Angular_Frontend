

export interface User{
  _id:string
  username:string
  email:string
  status:boolean
  key:string
  admin:boolean
}

export interface AuthResponse {
  message: string;
  status: Boolean;
  token:string
  user:User
}

export interface Image{
  _id:string
  userId:string
  image:string
  expiration:string
  Thumbnail:string
  fullLink:string
  html:string
  thumbnailHtml:string
}