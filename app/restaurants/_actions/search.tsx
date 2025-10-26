"use server";

import { db } from "@/app/_lib/prisma";

export const searchForRestaurants = async (search: string, userId?: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      usersWhoFavorited: userId
        ? {
            where: {
              userId: userId,
            },
          }
        : false,
    },
  });

  return restaurants.map((restaurant) => ({
    ...restaurant,
    isFavorited: userId ? restaurant.usersWhoFavorited.length > 0 : false,
    usersWhoFavorited: undefined, // Remove os dados internos
  }));
};

export default searchForRestaurants;
