'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductsByCategoryId } from '@/Api/Apis';
import ProductPages from '@/components/Pages/Shop/Catalogue/ProductPages/ProductPages';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const searchTerm = searchParams.get('searchTerm');

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useQuery<ApiResponse<Product>>({
    queryKey: ['shop-products', category, searchTerm, currentPage],
    queryFn: () => {
      const params: Record<string, string | number> = {
        page: currentPage,
        limit,
      };

      if (searchTerm) {
        params.searchTerm = searchTerm;
      }

      if (category) {
        return fetchProductsByCategoryId(category, params);
      }

      return fetchAllProducts(params);
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Shop'}
          </h1>
          {productsResponse && (
            <p className="text-gray-600 mt-2">
              {productsResponse.totalItems} product{productsResponse.totalItems !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        <ProductPages
          ProductsAPI={productsResponse}
          isLoading={isLoading}
          handlePage={handlePageChange}
        />

        {isError && (
          <div className="text-center py-12">
            <p className="text-red-600">
              Failed to load products. Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
