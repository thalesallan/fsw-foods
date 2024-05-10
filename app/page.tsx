import CategoryList from "./_components/category/category-list";
import Header from "./_components/shared/header";
import Search from "./_components/search/search";
import ProductList from "./_components/product/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import PromoBanner from "./_components/shared/promo-banner";
import RestaurantList from "./_components/restaurant/restaurant-list";
import Link from "next/link";
import { getRecommendedProducts } from "./_actions/product";

export default async function Home() {
  const products = await getRecommendedProducts(10);

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
