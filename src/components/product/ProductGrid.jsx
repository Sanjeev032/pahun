import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../common/ProductCard';
import { CardSkeleton } from '../common/Skeletons';
import EmptyState from '../ui/EmptyState';

const gridClasses =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16';

export const ProductGrid = ({
  products,
  isLoading,
  skeletonCount = 8,
  emptyTitle = 'No products yet',
  emptyDescription = 'Upload your first product to see it appear here in the storefront.',
}) => {
  if (isLoading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        className="col-span-full"
      />
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className={gridClasses}>
        {products.map((product) => (
          <motion.div
            key={product._id || product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default ProductGrid;

