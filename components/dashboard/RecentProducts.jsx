import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Image, MoreHorizontal, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  processing: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  out_of_stock: "bg-red-100 text-red-800"
};

export default function RecentProducts({ products, isLoading, onRefresh }) {
  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-gray-900">
          Your Recent Products
        </CardTitle>
        <Link to={createPageUrl("CreateProduct")}>
          <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 rounded-lg border">
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : products?.length > 0 ? (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 rounded-lg border hover:border-orange-200 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    {product.images?.[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.title_english}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Image className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {product.title_english}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Created {format(new Date(product.created_date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[product.status]}>
                    {product.status.replace('_', ' ')}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-orange-50 rounded-full flex items-center justify-center">
              <Package className="w-12 h-12 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Products Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by creating your first product with AI assistance
            </p>
            <Link to={createPageUrl("CreateProduct")}>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Create Your First Product
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
