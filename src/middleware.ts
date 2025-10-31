import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/card','/profile']; // دول اللي انا عايز احميهم
const authPages = ['/login','/register']; // Login دول اللي انا عايز احميهم بس ف حاله اللي لو كنت عامل 



export default async function middleware(req:NextRequest){ // بيجيلوا الريكوست 

    const token = await getToken({req}); 

    if(protectedPages.includes(req.nextUrl.pathname)){
        if(token){
            return NextResponse.next();
        }
        else{
            let redirectUrl = new URL( '/login' , process.env.NEXTAUTH_URL); 
            redirectUrl.searchParams.set('callback-url',req.nextUrl.pathname);
            return NextResponse.redirect(redirectUrl)
        }
    }

    if(authPages.includes(req.nextUrl.pathname)){
        if(!token){
            return NextResponse.next();
        }
        else{
            const redirectUrl = new URL( '/' , process.env.NEXTAUTH_URL); 
            return NextResponse.redirect(redirectUrl)
        }
    }
    return NextResponse.next();
}
