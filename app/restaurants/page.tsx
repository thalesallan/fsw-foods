"use client";

import { Restaurant } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import searchForRestaurants from "./_actions/search";
import Header from "../_components/shared/header";
import RestaurantItem from "../_components/restaurant/restaurant-item";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;

      const restaurants = await searchForRestaurants(searchFor);
      setRestaurants(restaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          {restaurants.length > 0
            ? "Restaurantes Encontrados"
            : "Ops... Não encontramos nada!"}
        </h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurants) => (
            <RestaurantItem
              key={restaurants.id}
              restaurant={restaurants}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
