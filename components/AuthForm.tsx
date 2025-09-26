"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from "next/image"
import Link from "next/link"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { toast } from "sonner"
import { auth } from "@/firebase/client"
const formSchema = z.object({
  username: z.string().min(2).max(50),
})
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Controller} from "react-hook-form"
import FormField from "./FormField"
import React, { use } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { sign } from "crypto"
interface AuthFormProps {
  type: "sign-in" | "sign-up"
}
const authFormSchema=(type:AuthFormProps["type"])=>{
    return z.object({
        name:type==="sign-up"?z.string().min(3) : z.string().optional(),
        email:z.string().email(),
        password:z.string().min(3),
    })
}
const AuthForm = ({type}:{type:AuthFormProps["type"]}) => {
  // 1. Define your form.
  const route=useRouter();
  const formSchema=authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        if(type==='sign-up'){
          const {name,email,password}=values;
          const userCreadential=await createUserWithEmailAndPassword(auth,email,password);

          const result=await signUp({
            uid:userCreadential.user.uid,
            name:name!,
            email,
            password,
          })
          if(!result?.success){
            toast.error(result?.message);
            return;
          }
          toast.success("Acccount created successfully.Please sign in.");
          route.push('/sign-in');
        }
        else{
          const {email,password}=values;
          const userCredential=await signInWithEmailAndPassword(auth,email,password);

          const idToken=await userCredential.user.getIdToken();

          if(!idToken){
            toast.error("Failed to retrieve ID token.");
            return;
          }
          await signIn({email,idToken});
          toast.success("Sign in successfully.");
          route.push('/');
        }
    }catch(err){
        console.log(err);
        toast.error(`there was an error ${err}`)
    }
  }

  const isSignIn=type==='sign-in';
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <div className="flex flex-row gap-2 justify-center">
            <Image src="/logo.svg" alt="Logo" height={32} width={32} />
            <h2 className="text-primary-100">PrepWise</h2>
        </div> 
              <h3>Practice Job Interview with AI</h3>
        </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn && (
            <FormField
            control={form.control} 
            name="name"
            label="Name" 
            placeholder="Your Name"
            />
        )}
        <FormField
            control={form.control} 
            name="email"
            label="Email" 
            placeholder="Your Email Address"
            />
        <FormField
            control={form.control} 
            name="password"
            label="Password" 
            placeholder="Enter Your Password"
            type="password"
            />
        <Button className="btn" type="submit">
            {isSignIn?'Sign In':'Create an Account'}
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    <p className="text-center">
        {isSignIn?"Don't have an account?":"Already have an account?"}
        <Link href={!isSignIn?"/sign-in":"/sign-up"} className="font-bold text user-primary ml-1">
        {!isSignIn?"Sign in":"Sign up"}
        </Link>
    </p>
    </div>
    
  )
}
export default AuthForm