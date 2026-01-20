
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types";

// กำหนด Type คร่าวๆ เพื่อให้ Code อ่านง่ายขึ้น (ปรับตามจริงได้ครับ)
interface ProductViewProps {
  product: Product;
}

export default function ProductView({ product }: ProductViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [imageIndex, setImageIndex] = useState(0);
  const { addToCart } = useShop();

  // ถ้าไม่มีข้อมูล product (กันเหนียว)
  if (!product) return <div className="p-10 text-center">Product not found</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images Area */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
             {/* เช็คว่ามีรูปหรือไม่ */}
             {product.image && product.image[imageIndex] && (
                <Image 
                  src={product.image[imageIndex]} 
                  alt={product.name} 
                  fill 
                  className="object-cover" 
                  priority // ใส่ priority เพื่อให้รูปหลักโหลดไวขึ้น
                />
             )}
          </div>
          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto">
            {product.image?.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setImageIndex(idx)} 
                  className={`w-20 h-20 relative border-2 rounded flex-shrink-0 ${imageIndex === idx ? 'border-black' : 'border-transparent'}`}
                >
                    <Image src={img} alt="" fill className="object-cover" />
                </button>
            ))}
          </div>
        </div>

        {/* Info Area */}
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary">{formatPrice(product.price)}</p>
            <p className="text-gray-600">{product.description}</p>
            
            <div className="space-y-2">
                <p className="font-medium">Select Size:</p>
                <div className="flex gap-2 flex-wrap">
                    {product.sizes?.map((size: string) => (
                        <Button 
                            key={size} 
                            variant={selectedSize === size ? "default" : "outline"}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            </div>

            <Button 
                size="lg" 
                className="w-full md:w-auto"
                disabled={!selectedSize}
                onClick={() => addToCart(product._id, selectedSize)}
            >
                {selectedSize ? "Add to Cart" : "Select a Size"}
            </Button>
            
            <div className="text-sm text-gray-500 pt-4 border-t">
                <p>Category: {product.category} {product.subCategory && `| ${product.subCategory}`}</p>
                <p>100% Original product.</p>
            </div>
        </div>
      </div>
    </div>
  );
}