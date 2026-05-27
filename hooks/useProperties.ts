import { useQuery } from '@tanstack/react-query';

import { propertyService } from '@services/propertyService';

import type { SearchPropertyInput } from '@schemas';

export const useProperties = (filters?: SearchPropertyInput) => {
  const {
    data: properties,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertyService.getAllProperties(filters),
    staleTime: 5 * 60 * 1000,
  });

  return { properties, isLoading, error, refetch };
};

export const useProperty = (id: string) => {
  const {
    data: property,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyService.getPropertyById(id),
    enabled: !!id,
  });

  return { property, isLoading, error };
};
