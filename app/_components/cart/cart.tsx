import { useContext, useState } from "react";
import { CartContext } from "../../_contex/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "../ui/card";
import { formatCurrency } from "@/app/_helpers/price";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { createOrder } from "@/app/_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

const Cart = () => {
  const { data } = useSession();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const { products, totalDiscounts, totalPrice, subtotalPrice, clearCart } =
    useContext(CartContext);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
      });

      clearCart();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col py-5">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-6">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground ">Subtotal</span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground ">Entrega</span>
                  {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                    <span className="uppercase text-primary">Grátis</span>
                  ) : (
                    formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground ">Descontos</span>
                  <span> - {formatCurrency(totalDiscounts)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            className="mt-6 w-full"
            onClick={handleFinishOrderClick}
            disabled={isSubmitLoading}
          >
            {isSubmitLoading && <Loader2 className="mr-2 h-4 animate-spin" />}
            Finalizar pedido
          </Button>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-sm text-muted-foreground">
            Não há produtos na sacola
          </span>
        </div>
      )}
    </div>
  );
};

export default Cart;
