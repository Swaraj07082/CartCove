"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
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

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const LoginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log(LoginData);

    if (LoginData?.ok) {
      router.push("/");
    }
  }

  const [eyeopen, seteyeopen] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto max-w-sm mt-[5%]">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                {/* <Label htmlFor="email">Email</Label> */}

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
                <div className="flex items-center">
                  {/* <Label htmlFor="password">Password</Label> */}
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
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
                            type={eyeopen ? "text" : "password"}
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

                {/* <Input id="password" type="password" required /> */}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
