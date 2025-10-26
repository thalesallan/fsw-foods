"use client";

import { Restaurant } from "@prisma/client";
import Image from "next/image";
import { Button } from "../../../_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import FavoriteButton from "../../../_components/shared/favorite-button";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl" | "id">;
  isFavorited?: boolean;
}

const RestaurantImage = ({
  restaurant,
  isFavorited = false,
}: RestaurantImageProps) => {
  const router = useRouter();

  const handleClickBack = () => router.back();

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleClickBack}
      >
        <ChevronLeftIcon />
      </Button>

      <div className="absolute right-4 top-4">
        <FavoriteButton
          restaurantId={restaurant.id}
          isFavorited={isFavorited}
          size={22}
        />
      </div>
    </div>
  );
};

export default RestaurantImage;
