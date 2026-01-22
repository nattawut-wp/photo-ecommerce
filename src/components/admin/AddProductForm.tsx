"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { ProductFormData } from "@/types";

//TODO: Add product form
export default function AddProductForm() {
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]);
  const { register, handleSubmit, reset, setValue, watch } = useForm<ProductFormData>({
    defaultValues: {
      sizes: []
    }
  });
  const selectedSizes = watch("sizes") || [];
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addSize = () => {
    if (!width || !height) {
      toast.error("Please enter both width and height");
      return;
    }
    const newSize = `${width}x${height}`;
    if (selectedSizes.includes(newSize)) {
      toast.error("This size is already added");
      return;
    }
    setValue("sizes", [...selectedSizes, newSize]);
    setWidth("");
    setHeight("");
  };

  //TODO: Remove size
  const removeSize = (sizeToRemove: string) => {
    setValue("sizes", selectedSizes.filter(s => s !== sizeToRemove));
  };

  const onSubmit = async (data: ProductFormData) => {
    if (data.sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("bestseller", String(data.bestseller || false));
      formData.append("sizes", JSON.stringify(data.sizes));

      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img);
      });

      const response = await api.post("/product/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Product added successfully");
        reset();
        setImages([null, null, null, null]);
        router.push("/admin/products");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
          const newImages = [...images];
          newImages[index] = file;
          setImages(newImages);
      }
  };

  const removeImage = (index: number) => {
      const newImages = [...images];
      newImages[index] = null;
      setImages(newImages);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow border">
        
        {/* Image Upload */}
        <div>
            <Label className="block mb-3">Product Images (Max 4)</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center relative bg-gray-50/50 hover:bg-gray-50 transition">
                        <input 
                            type="file" 
                            hidden 
                            accept="image/*"
                            id={`img-${index}`} 
                            onChange={(e) => handleImageChange(e, index)}
                        />
                        
                        {images[index] ? (
                            <div className="relative w-full h-full p-1">
                                <Image 
                                    src={URL.createObjectURL(images[index]!)} 
                                    alt="Preview" 
                                    fill 
                                    className="object-cover rounded" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm z-10"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <label htmlFor={`img-${index}`} className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-gray-400">
                                <Upload className="w-6 h-6 mb-1 opacity-50" />
                                <span className="text-xs">Upload</span>
                            </label>
                        )}
                    </div>
                ))}
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label>Product Name</Label>
                <Input {...register("name", { required: true })} placeholder="Product Name" />
            </div>
            <div className="space-y-2">
                <Label>Price (THB)</Label>
                <Input type="number" {...register("price", { required: true })} placeholder="0.00" />
            </div>
        </div>

        <div className="space-y-2">
            <Label>Description</Label>
            <Textarea {...register("description", { required: true })} placeholder="Description..." rows={4} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <Label>Category</Label>
                <select {...register("category")} className="w-full border rounded-md p-2 text-sm bg-white">
                    <option value="Landscape">Landscape</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Abstract">Abstract</option>
                </select>
             </div>
             <div className="space-y-2">
                <Label>Sub Category</Label>
                <select {...register("subCategory")} className="w-full border rounded-md p-2 text-sm bg-white">
                    <option value="Nature">Nature</option>
                    <option value="Urban">Urban</option>
                    <option value="Minimal">Minimal</option>
                </select>
             </div>
        </div>

        <div className="flex items-center space-x-2 border p-4 rounded-md bg-gray-50">
            <input type="checkbox" {...register("bestseller")} id="bestseller" className="w-4 h-4 text-primary rounded" />
            <Label htmlFor="bestseller" className="cursor-pointer">Add to Bestseller</Label>
        </div>

        <div className="space-y-4">
            <Label className="block">Add Product Sizes (Width x Height)</Label>
            <div className="flex gap-3 items-end">
                <div className="space-y-1">
                    <span className="text-xs text-gray-500">Width</span>
                    <Input 
                        type="number" 
                        value={width} 
                        onChange={(e) => setWidth(e.target.value)} 
                        placeholder="0" 
                        className="w-24"
                    />
                </div>
                <div className="flex items-center pb-2 text-gray-400">×</div>
                <div className="space-y-1">
                    <span className="text-xs text-gray-500">Height</span>
                    <Input 
                        type="number" 
                        value={height} 
                        onChange={(e) => setHeight(e.target.value)} 
                        placeholder="0" 
                        className="w-24"
                    />
                </div>
                <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addSize}
                    className="bg-gray-50"
                >
                    Add Size
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {selectedSizes.map((size) => (
                    <div 
                        key={size}
                        className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full text-sm"
                    >
                        <span>{size} cm</span>
                        <button 
                            type="button" 
                            onClick={() => removeSize(size)}
                            className="hover:text-red-400 transition"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
            
            {selectedSizes.length === 0 && (
                <p className="text-xs text-red-500">Please add at least one size</p>
            )}
        </div>

        <Button type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? "Adding Product..." : "Add Product"}
        </Button>
      </form>
  );
}