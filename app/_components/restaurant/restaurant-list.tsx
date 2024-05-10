import { getRestaurantsTopOrders } from "@/app/_actions/restaurant";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  //TODO: pegar restaurantes com maior numero de pedidos
  const restaurants = await getRestaurantsTopOrders(10);

  return (
    <div className="flex gap-4 overflow-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
