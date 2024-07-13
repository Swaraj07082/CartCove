import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Orders } from "@prisma/client"; // Adjust this import based on your setup

export const GET = async () => {
  const ordercount = await db.orders.count();
  const orders = await db.orders.findMany();

  return new NextResponse(JSON.stringify({ orders, ordercount }), {
    status: 200,
  });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  console.log(body);
  const orderData = {
    email: body.email,
    Address: body.Address,
    City: body.City,
    State: body.State,
    Pincode: Number(body.Pincode),
    OrderedProduct: {
      create: [
        {
          productId: "668c14823be36f685d12465b",
          quantity: 2, // Ensure quantity is part of your model
        },
        {
          productId: "668c52aad5d5f3a8450de022",
          quantity: 1,
        },
      ],
    },
  };

  try {
    // Save the orderData using Prisma
    const newOrder: Orders = await db.orders.create({
      data: {
        ...orderData,
      },
    });

    return new NextResponse(
      JSON.stringify({ newOrder, message: "New Order placed successfully" }),
      { status: 201 }
    );
  } catch (error:any) {
    console.error("Error creating order:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to create order",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
