"use client";

import AddItems from "@/app/_components/add-items";
import DeliveryInfo from "@/app/_components/delivery-info";
import BadgeDiscount from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { calculateProductPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";

import Image from "next/image";

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
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  return (
    <div className=" relative mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 shadow-inner">
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
        <div className="gap-2">
          <AddItems />
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={product.restaurant} />
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mb-3 mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sucos</h3>
      </div>
      <ProductList products={complementaryProducts} />

      <div className="mt-6 px-5">
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
