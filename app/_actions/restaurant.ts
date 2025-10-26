import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";

export const getRestaurants = async (take?: number) => {
  const restaurants = await db.restaurant.findMany({ take: take });

  if (!restaurants) notFound();

  return restaurants;
};

export const getRestaurantsTopOrders = async (take: number) => {
  const restaurants = await db.restaurant.findMany({
    take: take,
    orderBy: {
      orders: {
        _count: "desc",
      },
    },
  });

  if (!restaurants) notFound();

  return restaurants;
};

export const getRestaurantsById = async (id: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
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

  return !restaurant ? notFound() : restaurant;
};

export const getRestaurantsWithFavorites = async (
  userId?: string,
  take?: number,
) => {
  const restaurants = await db.restaurant.findMany({
    take: take,
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

  if (!restaurants) notFound();

  return restaurants.map((restaurant) => ({
    ...restaurant,
    isFavorited: userId ? restaurant.usersWhoFavorited.length > 0 : false,
    usersWhoFavorited: undefined, // Remove os dados internos
  }));
};

export const getRestaurantsTopOrdersWithFavorites = async (
  userId?: string,
  take: number = 10,
) => {
  const restaurants = await db.restaurant.findMany({
    take: take,
    orderBy: {
      orders: {
        _count: "desc",
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

  if (!restaurants) notFound();

  return restaurants.map((restaurant) => ({
    ...restaurant,
    isFavorited: userId ? restaurant.usersWhoFavorited.length > 0 : false,
    usersWhoFavorited: undefined, // Remove os dados internos
  }));
};
