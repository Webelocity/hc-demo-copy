'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiChevronRight } from 'react-icons/fi';
import { GoDotFill } from 'react-icons/go';
import styles from './SearchResults.module.css';
import FallBackImage from '@/components/shared/FallBackImage';

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

  const getCategoryName = (product: Product) => {
    const path = product?.defaultPath;
    if (!Array.isArray(path) || path.length === 0) return '';
    const last = path[path.length - 1];
    return (last as any)?.name ?? '';
  };

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
              {results.data.map((product) => {
                const variantsCount = product.productVariants?.length ?? 0;
                const hasMultipleVariants = variantsCount > 1;
                const singleVariant =
                  variantsCount === 1 ? product.productVariants[0] : undefined;
                const sku = hasMultipleVariants
                  ? product.sku
                  : singleVariant?.sku ?? product.sku;
                const upc = hasMultipleVariants
                  ? product.upc
                  : (singleVariant as any)?.upc ?? product.upc;
                const stockCount = hasMultipleVariants
                  ? product.inventoryCount
                  : singleVariant?.inventoryCount ?? product.inventoryCount;
                const hasStock =
                  typeof stockCount === 'number' && stockCount > 0;
                const price =
                  singleVariant?.finalPrice ?? product.finalPrice ?? 0;
                const categoryName = getCategoryName(product);

                return (
                  <div
                    key={product._id}
                    className={styles.resultItem}
                    onClick={() => handleProductClick(product._id)}
                  >
                    <div className={styles.productImage}>
                      {product.thumbnail || product.productMedia?.length > 0 ? (
                        <Image
                          src={product.thumbnail?.file || product.productMedia[0].file}
                          alt={product.name}
                          width={48}
                          height={48}
                          className={styles.image}
                        />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <FallBackImage />
                        </div>
                      )}
                    </div>

                    <div className={styles.productInfo}>
                      {categoryName && (
                        <span className={styles.categoryBadge}>
                          {categoryName}
                        </span>
                      )}
                      <p className={styles.productName}>{product.name}</p>
                      <div className={styles.metaList}>
                        {sku && (
                          <div className={styles.metaItem}>
                            <span className={styles.metaKey}>SKU</span>
                            <span className={styles.metaValue}>{sku}</span>
                          </div>
                        )}
                        {upc && (
                          <div className={styles.metaItem}>
                            <GoDotFill className={styles.metaDot} aria-hidden />
                            <span className={styles.metaKey}>UPC</span>
                            <span className={styles.metaValue}>{upc}</span>
                          </div>
                        )}
                        {typeof stockCount === 'number' && (
                          <div className={styles.metaItem}>
                            <GoDotFill className={styles.metaDot} aria-hidden />
                            <span
                              className={`${styles.metaValue} ${hasStock ? styles.inStock : styles.outOfStock
                                }`}
                            >
                              {hasStock ? `${stockCount} in stock` : 'Out of stock'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.productPrice}>
                      {hasMultipleVariants ? (
                        <div className={styles.variantCount}>
                          <span>
                            {variantsCount} Variant
                            {variantsCount !== 1 ? 's' : ''}
                          </span>
                          <FiChevronRight aria-hidden />
                        </div>
                      ) : (
                        <span className={styles.finalPrice}>
                          ${price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {results.totalItems > 8 && (
              <div className={styles.footer}>
                <button
                  className={styles.viewAllButton}
                  onClick={handleViewAllClick}
                >
                  <span>View all</span>
                  <strong>{results.totalItems}</strong>
                  <span>Products</span>
                  <FiChevronRight aria-hidden className={styles.viewAllIcon} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
