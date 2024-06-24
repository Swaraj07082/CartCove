import db from "@/lib/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {hash} from "bcrypt"



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

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    console.log(body)

    const { email, username, password } = formSchema.parse(body);

    const existingUserbyEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUserbyEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this Email Already Exists",
        },
        {
          status: 409,
        }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this Username Already Exists",
        },
        {
          status: 409,
        }
      );
    }

    const hashedpassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashedpassword,
      },
    });

    const { password: newUserpassowrd, ...rest } = newUser;
    return new NextResponse(
      JSON.stringify({ user: rest, message: "User created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 400 }
    );
  }
};