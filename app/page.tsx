import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

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

      <div className="px-5 pt-2">
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
    </>
  );
}
