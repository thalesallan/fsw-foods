import { getRestaurantsTopOrdersWithFavorites } from "@/app/_actions/restaurant";
import RestaurantItem from "./restaurant-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await getRestaurantsTopOrdersWithFavorites(
    session?.user?.id,
    10,
  );

  return (
    <div className="flex gap-4 overflow-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          isFavorited={restaurant.isFavorited}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
