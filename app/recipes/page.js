'use client';

import { Suspense } from 'react';
import RecipesClient from './RecipesClient';

export default function RecipesPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center">Loading recipes...</div>}>
      <RecipesClient />
    </Suspense>
  );
}
