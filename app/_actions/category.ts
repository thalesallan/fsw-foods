import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";

export const getCategories = async () => {
  return await db.category.findMany();
};

export const getCategoriesById = async (id: string) => {
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

  if (!category) notFound();

  return category;
};
