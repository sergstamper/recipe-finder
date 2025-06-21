'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const RecipeDetailClient = dynamic(() => import('./RecipeDetailClient'), { suspense: true });

export default function RecipeDetailWrapper() {
  return (
    <Suspense fallback={<div className="text-center">Loading recipe details...</div>}>
      <RecipeDetailClient />
    </Suspense>
  );
}
