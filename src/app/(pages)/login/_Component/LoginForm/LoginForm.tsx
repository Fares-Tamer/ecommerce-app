"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {signIn} from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

const formSchema = z.object({
  email:z.email('invalid email').nonempty('Email is Required'),
  Password:z.string('invalid Password').nonempty('Password is Required').regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,"invalid password"),
})


export function LoginForm() {
  // 1. Define your form.


  // const searchParams = useSearchParams();
  const [error, setError] = useState('')
  // console.log(searchParams.get('error')); 
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callback-url');  
  
  const [loading, setLoading] = useState<boolean>(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      Password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response =await signIn('credentials' , {
      callbackUrl:'/',
      redirect:false,
      email:values.email,
      password:values.Password,
    }) 
    console.log(response);
    if(response!.ok){
      location.href= callbackURL||'/' 
    }else{
      setError(response?.error)
    }
    setLoading(false);
  } 

  return <>
  <Card className="p-6 sm:w-sm">
    <Form {...form}>
      {error?<h1 className="text-destructive text-2xl text-center py-3">{error}</h1>:''}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control} 
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ali@example.com" type="email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Ahmed@123" type="password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="w-full cursor-pointer">{loading && <Loader2 className="animate-spin"/>} Submit</Button>
      </form>
    </Form>
  </Card>
  </>
}
