import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="p-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-1 pt-1">
        <PromoBanner
          src="/promo-banner.png"
          alt="Banner Desconto de até 30% em Pizzas"
        />
      </div>

      <div className="space-y-3 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold"> Pedidos Recomendados </h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-1 pt-6">
        <PromoBanner
          src="/promo-banner-2.png"
          alt="Banner a partir de R$17,90 em lanches"
        />
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold"> Restaurantes Recomendados </h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href={"/restaurants/recommended"}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}
