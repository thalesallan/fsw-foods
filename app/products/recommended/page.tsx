import Header from "@/app/_components/shared/header";
import ProductItem from "@/app/_components/product/product-item";
import { getRecommendedProducts } from "@/app/_actions/product";

const RecommendedProductsPage = async () => {
  const products = await getRecommendedProducts();

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProductsPage;
