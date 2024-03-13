import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset';
import {openDatabaseAsync, useSQLiteContext} from 'expo-sqlite/next';
import {useState} from 'react';

const localDatabase = require('@/assets/db/test.db');

const dbName = 'test.db';

function useDb() {
  const [loading, setLoading] = useState(false);
  const createDB = async () => {
    setLoading(true);
    try {
      if (
        !(
          await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)
        ).exists
      ) {
        await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}SQLite`
        );
      }
      const [{localUri, uri}] = await Asset.loadAsync(localDatabase);
      const result = await FileSystem.downloadAsync(
        uri,
        `${FileSystem.documentDirectory}SQLite/${dbName}`
      );

      console.log(localUri, uri);

      // const result = await FileSystem.copyAsync({
      //   from: localUri!,
      //   to: `${FileSystem.documentDirectory}SQLite/${dbName}`,
      // });
      console.log(result, 'result');

      return await openDatabaseAsync(`${dbName}`);
    } catch (error) {
      console.error('Error creating database', error);
    } finally {
      setLoading(false);
    }
  };

  return {createDB, loading};
}

export default useDb;
