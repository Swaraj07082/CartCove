import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Orders } from "@prisma/client"; // Adjust this import based on your setup

export const GET = async () => {
  const ordercount = await db.orders.count();
  const orders = await db.orders.findMany({
    include: {
      OrderedProduct: {
        include: {
          order: true,
          product: true,
        },
      },
    },
    // include for including lists that we have declared in schema  , by default they are not visible in the endpoint , to make them visible use include
  });

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
      create: body.OrderedProduct.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
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
  } catch (error: any) {
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
