import db from "@/lib/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { email, username, password } = body;

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

    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });

    const { password: newUserpassword, ...rest } = newUser;

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
