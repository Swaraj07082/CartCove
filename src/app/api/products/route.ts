import db from "@/lib/db";
import { Whisper } from "next/font/google";
import { NextResponse } from "next/server";

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
