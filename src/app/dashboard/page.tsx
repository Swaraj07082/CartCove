"use client";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export default function LoginForm() {
  const router = useRouter()
  const [eyeopen, seteyeopen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const response = await fetch('/api/users',{
      method : 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username : values.username,
        email : values.email,
        password : values.password
      })

    })

    if(response.ok){
      router.push('/login')
    }
  }


  const session = useSession()
  console.log(session)
const email = session.data?.user?.email
  console.log(session.data?.user?.email)
  return (
    <>
    { email == email ? (<>ADMIN HERE</>):(
      <>  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto max-w-sm mt-20">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Username</Label>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel></FormLabel> */}
                        <FormControl>
                          {/* <Input placeholder="Address..." {...field} /> */}
                          <Input
                            id="username"
                            type="username"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel></FormLabel> */}
                      <FormControl>
                        {/* <Input placeholder="Address..." {...field} /> */}
                        <Input
                          id="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel></FormLabel> */}
                      <div className="flex items-center relative">
                        {eyeopen ? (
                          <FaEye
                            className="absolute right-3"
                            onClick={() => {
                              seteyeopen(!eyeopen);
                            }}
                          />
                        ) : (
                          <FaEyeSlash
                            className="absolute right-3"
                            onClick={() => {
                              seteyeopen(!eyeopen);
                            }}
                          />
                        )}

                        <FormControl>
                          {/* <Input placeholder="Address..." {...field} /> */}
                          <Input
                            id="password"
                            type={ eyeopen ? 'text' : 'password' }
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      {/* <FormDescription>
              This is your public display name.
              </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              {/* <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="#" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form></>
    )}
    
    </>
  );
}
