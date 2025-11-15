'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  results: ApiResponse<Product> | undefined;
  isLoading: boolean;
  isError: boolean;
  searchTerm: string;
  categoryId?: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function SearchResults({
  results,
  isLoading,
  isError,
  searchTerm,
  categoryId,
  onClose,
  isOpen,
}: SearchResultsProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
    onClose();
  };

  const handleViewAllClick = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('searchTerm', searchTerm);
    if (categoryId) params.set('category', categoryId);
    router.push(`/shop?${params.toString()}`);
    onClose();
  };
  console.log('Search Results:', results);
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.dropdown}>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner} />
            <p className={styles.loadingText}>Searching...</p>
          </div>
        )}

        {isError && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>
              Failed to load search results. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && results && results.data.length === 0 && (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyText}>
              No products found for "{searchTerm}"
            </p>
          </div>
        )}

        {!isLoading && !isError && results && results.data.length > 0 && (
          <>
            <div className={styles.resultsHeader}>
              <p className={styles.resultsCount}>
                {results.totalItems} result{results.totalItems !== 1 ? 's' : ''}{' '}
                found
              </p>
            </div>

            <div className={styles.resultsList}>
              {results.data.map((product) => (
                <div
                  key={product._id}
                  className={styles.resultItem}
                  onClick={() => handleProductClick(product._id)}
                >
                  <div className={styles.productImage}>
                    {product.productMedia?.length > 0 ? (
                      <Image
                        src={product.productMedia[0].file}
                        alt={product.name}
                        width={48}
                        height={48}
                        className={styles.image}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <span>No image</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.productInfo}>
                    <p className={styles.productName}>{product.name}</p>
                    <div className={styles.productDetails}>
                      {product.brand && (
                        <span className={styles.productBrand}>
                          {product.brand}
                        </span>
                      )}
                      {product.sku && (
                        <span className={styles.productSku}>
                          SKU: {product.sku}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.productPrice}>
                    {product.isDiscounted && (
                      <span className={styles.originalPrice}>
                        ${product.priceBeforeDiscount.toFixed(2)}
                      </span>
                    )}
                    <span className={styles.finalPrice}>
                      ${product.finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {results.totalItems > 8 && (
              <div className={styles.footer}>
                <button
                  className={styles.viewAllButton}
                  onClick={handleViewAllClick}
                >
                  View all {results.totalItems} results
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
