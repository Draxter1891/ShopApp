import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import ProductsCard from '../../components/ProductsCard';
import { toggleFavorite } from '../../redux/slices/favouriteSlice';
import Header from '../../components/Header';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  isFav?: boolean;
}

const Favourite = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favourite.items);
  const user = useSelector((state: RootState) => state.user);

  const handleToggleFav = (product: Product) =>
    dispatch(toggleFavorite(product));

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Header text="Shop." />
        <Text style={styles.heading}>Favourites</Text>
      </View>

     
      <View style={styles.content}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your favorites list is empty.</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductsCard
                product={item}
                onAddToCart={() => {
                  Alert.alert('Item added to cart');
                }}
                onToggleFavourite={() => handleToggleFav(item)}
              />
            )}
            numColumns={2}
            initialNumToRender={6}
            removeClippedSubviews
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e3e7f1',
    elevation: 2,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3a4ba0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  flatListContent: {
    paddingBottom: 20,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});
