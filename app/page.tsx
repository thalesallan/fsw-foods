import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function Home() {
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
        <Image
          src="/promo-banner.png"
          alt="Banner Desconto de até 30% em Pizzas"
          height={0}
          width={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={50}
        />
      </div>

      <div className="space-y-3 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold"> Pedidos Recomendados </h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList />
      </div>
    </>
  );
}
