import { useQuery } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite/next';
import { ItemType } from './use-items';
import { CategoryId } from './use-categories';

function useItem(itemId: CategoryId) {
  const db = useSQLiteContext();

  const query = useQuery({
    queryKey: ['item', itemId],
    queryFn: (): Promise<ItemType | null> =>
      db.getFirstAsync('SELECT * FROM items WHERE id = ?', [itemId]),
  });

  return query;
}

export default useItem;
