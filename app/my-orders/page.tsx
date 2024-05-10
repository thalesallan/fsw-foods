import Header from "@/app/_components/shared/header";
import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrderItem from "../_components/order/order-item";
import { getMyOrdersByUserId } from "../_actions/order";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await getMyOrdersByUserId(session.user.id);

  return (
    <>
      <Header />

      <div className="px-5">
        <h2 className="mb-6 text-lg font-semibold">Meus Pedidos</h2>
        <div className="flex w-full flex-col gap-6">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
