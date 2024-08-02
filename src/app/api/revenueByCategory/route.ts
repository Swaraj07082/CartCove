import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const fashion = await db.products.findMany({
    where: {
      category: "fashion",
    },
  });

  const electronics = await db.products.findMany({
    where: {
      category: "electronics",
    },
  });
  const furniture = await db.products.findMany({
    where: {
      category: "furniture",
    },
  });
  const shoes = await db.products.findMany({
    where: {
      category: "shoes",
    },
  });
  const health = await db.products.findMany({
    where: {
      category: "health",
    },
  });

  console.log(fashion, electronics, furniture, shoes, health);

  const fashionRevenue = fashion.reduce((acc, product) => {
    const productRevenue = product.price * product.sales;
    return acc + productRevenue;
  }, 0);

  const electronicsRevenue = electronics.reduce((acc, product) => {
    const productRevenue = product.price * product.sales;
    return acc + productRevenue;
  }, 0);

  const furnitureRevenue = furniture.reduce((acc, product) => {
    const productRevenue = product.price * product.sales;
    return acc + productRevenue;
  }, 0);
  const shoesRevenue = shoes.reduce((acc, product) => {
    const productRevenue = product.price * product.sales;
    return acc + productRevenue;
  }, 0);
  const healthRevenue = health.reduce((acc, product) => {
    const productRevenue = product.price * product.sales;
    return acc + productRevenue;
  }, 0);

  const totalRevenue =
    fashionRevenue +
    electronicsRevenue +
    healthRevenue +
    shoesRevenue +
    furnitureRevenue;

  console.log(
    fashionRevenue,
    electronicsRevenue,
    furnitureRevenue,
    healthRevenue,
    shoesRevenue
  );

  return new NextResponse(
    JSON.stringify({
      totalRevenue,
      fashionRevenue,
      electronicsRevenue,
      furnitureRevenue,
      healthRevenue,
      shoesRevenue,
    })
  );
};
