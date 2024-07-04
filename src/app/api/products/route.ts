import db from "@/lib/db";
import { Whisper } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const products = await db.products.findMany();
  const productcount = await db.products.count();

  const stocks = await db.products.groupBy({
    by: ["category"],
    _sum: {
      stock: true,
    },
    orderBy: {
      category: "asc",
    },
  });

  return new NextResponse(JSON.stringify({ products, productcount, stocks }));
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  console.log(body);

  const newproduct = await db.products.create({
    data: {
      name: body.name,
      price: body.price,
      url: body.url,
      stock: body.stock,
      category: body.category,
      sales: 0,
    },
  });
  return new NextResponse(
    JSON.stringify({ newproduct, message: "New product created successfully" })
  );
};
