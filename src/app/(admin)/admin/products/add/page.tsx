import AddProductForm from "@/components/admin/AddProductForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/products">
            <Button variant="outline" size="icon">
                <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>
      <AddProductForm />
    </div>
  );
}