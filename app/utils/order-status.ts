import { OrderStatus } from "@prisma/client";

export const getOrderStatus = (status: OrderStatus) => {
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

export const getOrderColor = (status: OrderStatus) => {
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
