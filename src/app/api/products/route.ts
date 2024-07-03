import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const products = await db.products.findMany();
  const productcount = await db.products.count();

  return new NextResponse(JSON.stringify({ products , productcount }));
};
