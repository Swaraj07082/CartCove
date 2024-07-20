import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest | Request) => {
  const url = req.url;
  console.log(url);

  const email = url.slice(43).toString();

  console.log(email);

  const userOrders = await db.orders.findMany({
    include: {
      OrderedProduct: {
        include: {
          order: true,
          product: true,
        },
      },
    },
    where : {
        email : 'swarajmali100@gmail.com'
    }
  });

  console.log(userOrders);

  return new NextResponse(JSON.stringify({userOrders}))
};
