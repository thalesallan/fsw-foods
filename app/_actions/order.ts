"use server";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data });
  revalidatePath("/my-orders");
};

export const getMyOrdersByUserId = async (userId?: string) => {
  const orders = await db.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return !orders ? notFound() : orders;
};
