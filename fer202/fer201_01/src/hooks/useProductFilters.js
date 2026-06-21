import { useMemo } from 'react';

export const useProductFilters = (products, searchQuery, sortBy) => {
  return useMemo(() => {
    let filtered = products;

    // search
    const q = (searchQuery || '').trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(p =>
        (p.model || p.title || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      );
    }



    // sort
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc': sorted.sort((a, b) => parseFloat((a.price).replace(/\$/, "")) - parseFloat((b.price).replace(/\$/, ""))); break;
      case 'price-desc': sorted.sort((a, b) => parseFloat((b.price).replace(/\$/, "")) - parseFloat((a.price).replace(/\$/, ""))); break;
    }
    return sorted;
  }, [products, searchQuery, sortBy]);
};
