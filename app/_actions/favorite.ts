"use server";

import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleFavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  const favorite = await db.userFavoriteRestaurant.findUnique({
    where: {
      userId_restaurantId: {
        userId,
        restaurantId,
      },
    },
  });

  if (favorite) {
    // Remove dos favoritos
    await db.userFavoriteRestaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });
  } else {
    // Adiciona aos favoritos
    await db.userFavoriteRestaurant.create({
      data: {
        userId,
        restaurantId,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/restaurants");
  revalidatePath(`/restaurants/${restaurantId}`);
};

export const getUserFavoriteRestaurants = async (userId: string) => {
  const favorites = await db.userFavoriteRestaurant.findMany({
    where: {
      userId,
    },
    include: {
      restaurant: true,
    },
  });

  return favorites.map((fav) => fav.restaurant);
};

export const isRestaurantFavorited = async (
  userId: string,
  restaurantId: string,
) => {
  const favorite = await db.userFavoriteRestaurant.findUnique({
    where: {
      userId_restaurantId: {
        userId,
        restaurantId,
      },
    },
  });

  return !!favorite;
};
