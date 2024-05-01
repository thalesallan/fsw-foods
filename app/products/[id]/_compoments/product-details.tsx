"use client";

import BadgeDiscount from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { calculateProductPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
    orderBy: {
      discountPercentage: "desc";
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, Setquantity] = useState(1);

  const incrementQuantity = () =>
    Setquantity((currentState) => currentState + 1);
  const decrementQuantity = () =>
    Setquantity((currentState) =>
      currentState > 1 ? currentState - 1 : currentState,
    );

  return (
    <div className="py-5">
      <div className="itens-center flex gap-[0.375rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="mt-1 items-center text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-3 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <BadgeDiscount product={product} />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            De: {formatCurrency(Number(product.price))}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={decrementQuantity}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4 text-center">{quantity}</span>
          <Button size="icon" onClick={incrementQuantity}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="px-5">
        <Card className="mt-5 flex justify-around py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entraga</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Tempo</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
