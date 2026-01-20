"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types"; // อย่าลืมสร้าง type Product ใน src/types/index.ts
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product._id} className="overflow-hidden group">
          <div className="relative aspect-[3/4] bg-gray-100">
            {product.image && product.image[0] ? (
              <Image
                src={product.image[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <div className="mt-2 font-bold text-primary">{formatPrice(product.price)}</div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/product/${product._id}`} className="w-full">
              <Button className="w-full" variant="secondary">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}