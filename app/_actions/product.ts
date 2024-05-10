"use server";

import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";

export const getProductByRestaurantId = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
    include: {
      restaurant: true,
    },
  });

  return !product ? notFound() : product;
};

export const getJuicesByRestaurantId = async (id: string) => {
  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return !juices ? notFound() : juices;
};

export const getRecommendedProducts = async (take: number = 20) => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: take,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!products) {
    return notFound();
  }

  return products;
};

export const getProductsByCategoryId = async (id: string) => {
  const category = await db.category.findUnique({
    where: {
      id: id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return !category ? notFound() : category;
};
