"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import * as z from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().nonempty("Name is required").min(3, "At least 3 chars"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z
    .string()
    .nonempty("Password is required")
    // .regex(
    //   /"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/,
    //   "Password must be 5-15 chars, include upper, lower, number, and symbol"
    // )
    ,
  rePassword: z.string().nonempty("Repassword is required"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .min(11, "Phone must be 11 digits")
    .max(11, "Phone must be 11 digits"),
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match",
});

export default function Register() {
  const [loding, setLoding] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  async function signUp(data) {
    try {
      setLoding(true);
      setApiError("");

      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 409) setApiError("Email already exists"); 
        else setApiError(result.message || "Signup failed");
        return;
      }

      console.log("Success:", result); 
      router.push('/login')
    } catch (err) {
      setApiError("Network error, try again later");
    } finally {
      setLoding(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 py-25 w-full max-w-md mx-auto"> 
      <h1 className="text-2xl font-semibold text-center mb-6">Register Now</h1>

      <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <Input {...register("name")} placeholder="Name" className={errors.name ? "border-red-500" : ""} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <Input {...register("email")} placeholder="Email" type="email" className={errors.email ? "border-red-500" : ""} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <Input {...register("password")} placeholder="Password" type="password" className={errors.password ? "border-red-500" : ""} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* RePassword */}
        <div>
          <Input {...register("rePassword")} placeholder="Re-enter Password" type="password" className={errors.rePassword ? "border-red-500" : ""} />
          {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <Input {...register("phone")} placeholder="Phone" className={errors.phone ? "border-red-500" : ""} />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {apiError && <p className="text-red-500 text-center">{apiError}</p>}

        <Button type="submit" disabled={loding}>
          {loding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Register"}
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}