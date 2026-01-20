import OrderList from "@/components/shop/OrderList";

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <OrderList />
    </div>
  );
}