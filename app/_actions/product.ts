"use server";

import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";

export const productByid = async (id: string) => {
  await db.product.findUnique({
    where: {
      id: id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!productByid) {
    return notFound();
  }
};
