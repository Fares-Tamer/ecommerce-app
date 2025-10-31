import { UserResponse } from "@/interfaces/login" 
import NextAuth, { User } from "next-auth" 
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" { 
  interface Session {
    user: UserResponse
  }

  interface User {
    user: UserResponse
    token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: UserResponse
    token: string
  }
} 