import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Car {
  id: string;
  title: string;
  brand: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  image: string;
  healthScore?: number;
  views?: number;
  favorites?: number;
  daysListed?: number;
  isNew?: boolean;
}

interface ComparisonContextType {
  comparisonList: Car[];
  addToComparison: (car: Car) => void;
  removeFromComparison: (carId: string) => void;
  clearComparison: () => void;
  isInComparison: (carId: string) => boolean;
  maxComparisonReached: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_COMPARISON_ITEMS = 4;

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<Car[]>(() => {
    const saved = localStorage.getItem('comparisonList');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Save to localStorage whenever comparison list changes
  useEffect(() => {
    localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
  }, [comparisonList]);

  const addToComparison = (car: Car) => {
    if (comparisonList.length >= MAX_COMPARISON_ITEMS) {
      toast.error(`You can only compare up to ${MAX_COMPARISON_ITEMS} vehicles at once.`);
      return;
    }

    if (comparisonList.some(c => c.id === car.id)) {
      toast.info('This vehicle is already in your comparison list.');
      return;
    }

    setComparisonList(prev => [...prev, car]);
    toast.success(`${car.title} added to comparison.`);
  };

  const removeFromComparison = (carId: string) => {
    const car = comparisonList.find(c => c.id === carId);
    setComparisonList(prev => prev.filter(c => c.id !== carId));
    if (car) {
      toast.info(`${car.title} removed from comparison.`);
    }
  };

  const clearComparison = () => {
    setComparisonList([]);
    toast.info('Comparison list cleared.');
  };

  const isInComparison = (carId: string) => {
    return comparisonList.some(c => c.id === carId);
  };

  const maxComparisonReached = comparisonList.length >= MAX_COMPARISON_ITEMS;

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        maxComparisonReached,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};



