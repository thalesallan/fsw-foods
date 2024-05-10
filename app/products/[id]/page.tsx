import ProductImage from "./_compoments/product-image";
import ProductDetails from "./_compoments/product-details";
import {
  getJuicesByRestaurantId,
  getProductByRestaurantId,
} from "@/app/_actions/product";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProductByRestaurantId(id);
  const juices = await getJuicesByRestaurantId(product.restaurantId);

  return (
    <div>
      <ProductImage product={product} />
      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;
