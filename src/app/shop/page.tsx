import { Suspense } from 'react';
import ShopContent from './ShopContent';

export default function Shop() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
