import { useQuery } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite/next';

export interface CategoryType {
  id: number;
  name: string;
  parent_id: number;
  list_order: number;
}

export type CategoryId = number | string;

function useCategories(categoryId: CategoryId) {
  const db = useSQLiteContext();

  const query = useQuery({
    queryKey: ['category', categoryId],
    queryFn: (): Promise<CategoryType[]> =>
      db.getAllAsync(
        'SELECT id, name FROM categories where parent_id = ? ORDER BY list_order, name',
        [categoryId]
      ),
  });

  return query;
}

export default useCategories;
