import { CartContext, CartProduct } from "@/app/_contex/cart";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import Image from "next/image";
import { AddItems } from "../shared/add-items";
import { useContext } from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Trash } from "lucide-react";

interface CartItemProps {
  cartProduct: CartProduct;
}

console.log(AddItems);

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);

  const handleRemoveProductClick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="truncate text-sm">{cartProduct.name}</h3>
          <div className="flex items-center gap-1 font-semibold">
            <h4>
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs font-normal text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 border border-solid border-muted-foreground"
                onClick={handleDecreaseQuantityClick}
              >
                <ChevronLeftIcon size={18} />
              </Button>
              <span className="w-7 text-center">{cartProduct.quantity}</span>
              <Button
                size="icon"
                onClick={handleIncreaseQuantityClick}
                className="h-7 w-7"
              >
                <ChevronRightIcon size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 border border-solid border-muted-foreground"
        onClick={handleRemoveProductClick}
      >
        <Trash size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
