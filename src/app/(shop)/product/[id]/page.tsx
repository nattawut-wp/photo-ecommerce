// src/app/product/[id]/page.tsx
import { api } from "@/lib/axios";
import ProductView from "@/components/product/ProductView";
import type { Metadata, ResolvingMetadata } from 'next';

// 1. ฟังก์ชันสำหรับดึงข้อมูล (ทำงานฝั่ง Server)
async function getProduct(id: string) {
  try {
    // หมายเหตุ: การใช้ Axios บน Server อาจต้องระบุ Full URL (http://localhost:3000...) 
    // หรือใช้ fetch ธรรมดาถ้า api อยู่คนละที่
    const res = await api.get(`/product/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// 2. ส่วนสร้าง Metadata (SEO) ไดนามิกตามชื่อสินค้า
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params; // Next.js 15: params is a Promise
  const product = await getProduct(id);
 
  return {
    title: product ? `${product.name} | My Shop` : "Product Not Found",
    description: product?.description || "Detail page",
    openGraph: {
      images: product?.image?.[0] ? [product.image[0]] : [],
    },
  };
}

// 3. Main Page Component
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Next.js 15: params is a Promise
  // ดึงข้อมูลก่อน render
  const product = await getProduct(id);

  if (!product) {
    return <div className="p-10 text-center text-red-500">Product Not Found</div>;
  }

  // ส่งข้อมูลไปให้ Client Component แสดงผล
  return <ProductView product={product} />;
}