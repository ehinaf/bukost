import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

//define a schema for input validation
const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(1, "Phone is required").max(20),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, phone, password } = userSchema.parse(body);

    //check email ready
    const existUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exsist",
        },
        { status: 409 }
      );
    }

    //check phone ready
    const existUserByPhone = await db.user.findUnique({
      where: { phone: phone },
    });

    if (existUserByPhone) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this phone already exsist",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        phone: phone,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
}
