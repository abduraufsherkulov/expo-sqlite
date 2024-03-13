import {useQuery} from '@tanstack/react-query';
import {useSQLiteContext} from 'expo-sqlite/next';
import {CategoryId} from './use-categories';

export interface ItemType {
  id: number;
  category_id: number;
  list_order: number;
  subtitle: string;
  app_content: string;
  app_image_file_name: string;
  app_audio_file_name: string;
  lookup_value: string;
  title: string;
  primary_image_url: string;
}

function useItems(categoryId: CategoryId) {
  const db = useSQLiteContext();

  const query = useQuery({
    queryKey: ['items', categoryId],
    queryFn: (): Promise<ItemType[]> =>
      db.getAllAsync(
        'SELECT id, title, primary_image_url FROM items WHERE category_id = ? ORDER BY title',
        [categoryId]
      ),
  });

  console.log(query.error, 'error');

  return query;
}

export default useItems;
