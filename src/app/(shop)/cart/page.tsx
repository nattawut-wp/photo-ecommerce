import CartView from "@/components/cart/CartView";

export default function CartPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <CartView />
    </div>
  );
}