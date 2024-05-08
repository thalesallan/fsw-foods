"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/app/_lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronRightIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { formatCurrency } from "@/app/_helpers/price";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/app/_contex/cart";
import { useRouter } from "next/navigation";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELED:
      return "Cancelado";
    case OrderStatus.COMPLETED:
      return "Entregue";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.DELIVERING:
      return "Em Transporte";
    case OrderStatus.PREPARING:
      return "Preparando";
    default:
      return "Unknown";
  }
};

const getOrderColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELED:
      return "bg-[#EEEEEE]";
    case OrderStatus.COMPLETED:
      return "bg-[#5DC05B] text-white";
    case OrderStatus.CONFIRMED:
      return "bg-[#5DC05B] text-white";
    case OrderStatus.DELIVERING:
      return "bg-[#5DC05B] text-white";
    case OrderStatus.PREPARING:
      return "bg-[#5DC05B] text-white";
    default:
      return "Unknown";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: {
          ...orderProduct.product,
          restaurant: order.restaurant,
          quantity: orderProduct.quantity,
        },
      });
    }

    router.push(`/restaurants/${order.restaurantId}`);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={cn(
            "w-fit rounded-full px-2 py-[2px] text-muted-foreground",
            getOrderColor(order.status),
          )}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatus(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button
            variant="link"
            size="icon"
            className="h-5 w-4 text-black"
            asChild
          >
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div>
          {order.products.map((product) => (
            <div key={product.id} className="mt-2 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-500">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">
            {formatCurrency(Number(order.totalPrice))}
          </span>
          <Button
            variant="ghost"
            className="font-semibold text-primary"
            onClick={handleRedoOrderClick}
            disabled={order.status !== OrderStatus.COMPLETED}
          >
            <Link href={"/"}>Adicionar à sacola</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
