import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(){
    const cookieStore = await cookies();
    const x = cookieStore.get("__Secure-next-auth.session-token")?.value 
           || cookieStore.get("_vercel_jwt")?.value; 

    if(!x) {
        console.warn("⚠ No session token found in cookies");
        return null;
    }

    const decoded = await decode({
        token: x,
        secret: process.env.NEXTAUTH_SECRET!,
    });

    return decoded?.token; // أو ممكن decoded?.accessToken حسب انت بتسميه في NextAuth
}