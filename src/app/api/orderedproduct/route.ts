import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const OrderedProduct = await db.orderedProduct.findMany({
    include: {
      order: true,
      product: true,
    },
  });

  return new NextResponse(JSON.stringify({ OrderedProduct }), {
    status: 200,
  });
};
