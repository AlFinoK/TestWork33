export interface LoginResponse extends CurrentUserResponse {
  accessToken: string
  refreshToken: string
}

export interface CurrentUserResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RefreshTokenRequest {
  refreshToken: string
  expiresInMins: number
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
