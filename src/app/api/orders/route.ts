import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const ordercount = await db.orders.count();

  return new NextResponse(JSON.stringify({ ordercount }), { status: 200 });
};
