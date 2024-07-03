import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const products = await db.products.findMany();
  return new NextResponse(JSON.stringify({ products }));
};
