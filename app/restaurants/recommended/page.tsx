import Header from "@/app/_components/shared/header";
import RestaurantItem from "@/app/_components/restaurant/restaurant-item";
import { getRestaurantsWithFavorites } from "@/app/_actions/restaurant";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

const RecommendedRestaurants = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await getRestaurantsWithFavorites(session?.user?.id);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              isFavorited={restaurant.isFavorited}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
