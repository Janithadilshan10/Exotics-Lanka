import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { featuredCars } from '@/data/mockData';

export interface SearchFilters {
  searchQuery: string;
  brands: string[];
  priceRange: [number, number];
  yearRange: [number, number];
  mileageRange: [number, number];
  fuelTypes: string[];
  transmissions: string[];
  locations: string[];
  condition: string[];
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  filters: SearchFilters;
  alertEnabled: boolean;
  alertFrequency: 'instant' | 'daily' | 'weekly';
  lastChecked: string;
  newMatchesCount: number;
  totalMatches: number;
  createdAt: string;
  updatedAt: string;
}

interface SavedSearchContextType {
  savedSearches: SavedSearch[];
  getSavedSearch: (id: string) => SavedSearch | undefined;
  saveSearch: (name: string, filters: SearchFilters) => void;
  updateSearch: (id: string, updates: Partial<SavedSearch>) => void;
  deleteSearch: (id: string) => void;
  checkForNewMatches: (searchId: string) => number;
  markAsChecked: (searchId: string) => void;
  getTotalNewMatches: () => number;
}

const SavedSearchContext = createContext<SavedSearchContextType | undefined>(undefined);

export const SavedSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Load saved searches from localStorage
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`savedSearches_${user.id}`);
      if (saved) {
        try {
          setSavedSearches(JSON.parse(saved));
        } catch {
          setSavedSearches([]);
        }
      }
    } else {
      setSavedSearches([]);
    }
  }, [user]);

  // Save to localStorage
  useEffect(() => {
    if (user && savedSearches.length >= 0) {
      localStorage.setItem(`savedSearches_${user.id}`, JSON.stringify(savedSearches));
    }
  }, [savedSearches, user]);

  const getSavedSearch = (id: string) => {
    return savedSearches.find(search => search.id === id);
  };

  const countMatches = (filters: SearchFilters): number => {
    return featuredCars.filter(car => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          car.title.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) {
        return false;
      }

      // Price range
      const priceInM = car.price / 1000000;
      if (priceInM < filters.priceRange[0] || priceInM > filters.priceRange[1]) {
        return false;
      }

      // Year range
      if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) {
        return false;
      }

      // Mileage range
      if (car.mileage < filters.mileageRange[0] || car.mileage > filters.mileageRange[1]) {
        return false;
      }

      // Fuel types
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(car.fuelType)) {
        return false;
      }

      // Transmissions
      if (filters.transmissions.length > 0 && !filters.transmissions.includes(car.transmission)) {
        return false;
      }

      // Locations
      if (filters.locations.length > 0 && !filters.locations.includes(car.location)) {
        return false;
      }

      // Condition
      if (filters.condition.length > 0) {
        const carCondition = car.isNew ? "New" : "Used";
        if (!filters.condition.includes(carCondition)) {
          return false;
        }
      }

      return true;
    }).length;
  };

  const saveSearch = (name: string, filters: SearchFilters) => {
    if (!user) {
      toast.error('Please log in to save searches');
      return;
    }

    const matchCount = countMatches(filters);

    const newSearch: SavedSearch = {
      id: `search_${Date.now()}`,
      userId: user.id,
      name,
      filters,
      alertEnabled: true,
      alertFrequency: 'daily',
      lastChecked: new Date().toISOString(),
      newMatchesCount: 0,
      totalMatches: matchCount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSavedSearches(prev => [newSearch, ...prev]);
    toast.success(`Search "${name}" saved successfully!`);
  };

  const updateSearch = (id: string, updates: Partial<SavedSearch>) => {
    setSavedSearches(prev =>
      prev.map(search =>
        search.id === id
          ? { ...search, ...updates, updatedAt: new Date().toISOString() }
          : search
      )
    );
    toast.success('Search updated');
  };

  const deleteSearch = (id: string) => {
    const search = savedSearches.find(s => s.id === id);
    setSavedSearches(prev => prev.filter(search => search.id !== id));
    toast.success(`Search "${search?.name}" deleted`);
  };

  const checkForNewMatches = (searchId: string): number => {
    const search = getSavedSearch(searchId);
    if (!search) return 0;

    const currentMatches = countMatches(search.filters);
    const newMatches = Math.max(0, currentMatches - search.totalMatches);

    if (newMatches > 0) {
      updateSearch(searchId, {
        newMatchesCount: newMatches,
        totalMatches: currentMatches,
      });
    }

    return newMatches;
  };

  const markAsChecked = (searchId: string) => {
    const search = getSavedSearch(searchId);
    if (!search) return;

    const currentMatches = countMatches(search.filters);
    
    updateSearch(searchId, {
      lastChecked: new Date().toISOString(),
      newMatchesCount: 0,
      totalMatches: currentMatches,
    });
  };

  const getTotalNewMatches = (): number => {
    return savedSearches.reduce((total, search) => total + search.newMatchesCount, 0);
  };

  return (
    <SavedSearchContext.Provider
      value={{
        savedSearches,
        getSavedSearch,
        saveSearch,
        updateSearch,
        deleteSearch,
        checkForNewMatches,
        markAsChecked,
        getTotalNewMatches,
      }}
    >
      {children}
    </SavedSearchContext.Provider>
  );
};

export const useSavedSearches = () => {
  const context = useContext(SavedSearchContext);
  if (context === undefined) {
    throw new Error('useSavedSearches must be used within a SavedSearchProvider');
  }
  return context;
};



