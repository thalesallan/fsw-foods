import Header from "@/app/_components/shared/header";
import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserFavoriteRestaurants } from "../_actions/favorite";
import RestaurantItem from "../_components/restaurant/restaurant-item";

const MyFavoriteRestaurantsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return redirect("/");
  }

  const favoriteRestaurants = await getUserFavoriteRestaurants(session.user.id);

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        {favoriteRestaurants.length > 0 ? (
          <div className="flex w-full flex-col gap-6">
            {favoriteRestaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                isFavorited={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Você ainda não tem restaurantes favoritos.
          </p>
        )}
      </div>
    </>
  );
};

export default MyFavoriteRestaurantsPage;
