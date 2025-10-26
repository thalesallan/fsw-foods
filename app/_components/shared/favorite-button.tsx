"use client";

import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { toggleFavoriteRestaurant } from "@/app/_actions/favorite";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  restaurantId: string;
  isFavorited?: boolean;
  size?: number;
  className?: string;
}

const FavoriteButton = ({
  restaurantId,
  isFavorited = false,
  size = 16,
  className = "",
}: FavoriteButtonProps) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [favorited, setFavorited] = useState(isFavorited);
  const router = useRouter();

  // Sincroniza o estado local com a prop quando ela mudar
  useEffect(() => {
    setFavorited(isFavorited);
  }, [isFavorited]);
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!data?.user?.id) {
      toast.error("Você precisa estar logado para favoritar restaurantes");
      return;
    }

    try {
      setIsLoading(true);
      await toggleFavoriteRestaurant(data.user.id, restaurantId);

      setFavorited(!favorited);

      if (!favorited) {
        toast.success("Restaurante adicionado aos favoritos!");
      } else {
        toast.success("Restaurante removido dos favoritos!");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar favoritos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      className={`h-7 w-7 rounded-full bg-gray-700 ${className}`}
      onClick={handleFavoriteClick}
      disabled={isLoading}
    >
      <HeartIcon
        size={size}
        className={
          favorited ? "fill-red-500 text-red-500" : "fill-white text-white"
        }
      />
    </Button>
  );
};

export default FavoriteButton;
