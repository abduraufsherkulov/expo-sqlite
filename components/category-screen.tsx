import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Link,
  Stack,
  useLocalSearchParams,
  usePathname,
  useSegments,
} from 'expo-router';
import useCategories from '@/hooks/use-categories';
import useItems from '@/hooks/use-items';

interface ContentsScreenProps {
  headerShown?: boolean;
}

function ContentsScreen({headerShown = false}: ContentsScreenProps) {
  const {categoryId, categoryName} = useLocalSearchParams<{
    categoryId: string;
    categoryName: string;
  }>();
  const localCategoryId = categoryId || 1;
  const categories = useCategories(localCategoryId);
  const items = useItems(localCategoryId);

  return (
    <View style={{flex: 1}}>
      <Stack.Screen
        options={{
          headerShown,
          title: categoryName ?? 'Contents',
        }}
      />

      <ScrollView>
        <View style={styles.screen}>
          {categories?.data?.map(object => (
            <View key={object.id} style={styles.listItemRow}>
              <Link
                href={{
                  pathname: `/contents/category/${object.id}`,
                  params: {
                    categoryName: object.name,
                  },
                }}
              >
                <View style={styles.listItemText}>
                  <Text>{object.name}</Text>
                </View>
              </Link>
            </View>
          ))}
          {items?.data?.map(object => (
            <View key={object.id} style={styles.listItemRow}>
              <Link href={`/contents/category/item/${object.id}`}>
                <View style={styles.listItemText}>
                  <Text>{object.title}</Text>
                </View>
              </Link>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'flex-start',
  },
  listItemRow: {
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  listItemText: {
    padding: 10,
    fontSize: 16,
  },
});

export default ContentsScreen;
