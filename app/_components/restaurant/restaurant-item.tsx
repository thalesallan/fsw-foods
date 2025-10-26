import { Restaurant } from "@prisma/client";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../../helpers/price";
import Link from "next/link";
import { cn } from "../../_lib/utils";
import FavoriteButton from "../shared/favorite-button";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  isFavorited?: boolean;
}

const RestaurantItem = ({
  restaurant,
  className,
  isFavorited = false,
}: RestaurantItemProps) => {
  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="space-y-3">
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-lg object-cover"
            />
          </Link>
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-[8px] py-[4px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
          <div className="absolute right-2 top-2">
            <FavoriteButton
              restaurantId={restaurant.id}
              isFavorited={isFavorited}
            />
          </div>
        </div>
        {/* TEXTO */}
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          {/* INFO ENTREGA */}
          <div className="flex gap-3">
            {/* CUSTO ENTREGA */}
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            {/* TEMPO ENTREGA */}
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
