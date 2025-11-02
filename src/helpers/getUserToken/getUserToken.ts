import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookieStore = await cookies();

  // خُد التوكن من الكوكي اللي موجود في Vercel أو Local
  const token =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  if (!token) {
    console.error("❌ No session token found in cookies");
    return null;
  }

  const decoded = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded?.token; // أو decoded?.accessToken لو انت مسميه كده في الكولباك بتاع next-auth
} 