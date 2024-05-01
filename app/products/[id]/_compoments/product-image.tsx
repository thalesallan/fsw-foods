"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "../../../_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleClickBack = () => router.back();

  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleClickBack}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
