"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

//TODO: Admin product list
export default function AdminProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);


  //TODO: Fetch products
  const fetchProducts = async () => {
    try {
        const res = await api.get('/product/list');
        setProducts(res.data);
    } catch (error) {
        toast.error("Failed to load products");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //TODO: Handle delete click
  const handleDeleteClick = (product: Product) => {
      setProductToDelete(product);
      setDeleteDialogOpen(true);
  }

  //TODO: Confirm delete
  const confirmDelete = async () => {
      if (!productToDelete) return;
      
      setIsDeleting(true);
      try {
          const res = await api.delete(`/product/${productToDelete._id}`);
          if(res.data.success) {
              toast.success("Product deleted successfully");
              setDeleteDialogOpen(false);
              fetchProducts();
          }
      } catch (error) {
          toast.error("Error deleting product");
      } finally {
          setIsDeleting(false);
      }
  }

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product._id}>
                        <TableCell>
                            <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                                {product.image && product.image[0] && (
                                    <Image src={product.image[0]} alt="" fill className="object-cover"/>
                                )}
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" size="sm" onClick={() => handleDeleteClick(product)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex flex-col items-center sm:items-start">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <DialogTitle className="text-xl font-bold text-gray-900">Confirm Deletion</DialogTitle>
                    <DialogDescription className="text-gray-500 mt-2">
                        Are you sure you want to delete <span className="font-semibold text-gray-900">{productToDelete?.name}</span>? 
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting} className="w-full sm:w-auto">
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting} className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                        {isDeleting ? "Deleting..." : "Delete Product"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
