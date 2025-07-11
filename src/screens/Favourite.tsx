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
import { AppDispatch, RootState } from '../redux/Store';
import ProductsCard from '../components/ProductsCard';
import { toggleFavorite } from '../redux/slices/favouriteSlice';

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
      <Text style={styles.heading}>
        {`Here's your Favourites ${user.fname}`}{' '}
      </Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductsCard
            product={item}
            onAddToCart={() => {
              Alert.alert('item added to cart');
            }}
            onToggleFavourite={() => handleToggleFav(item)}
          />
        )}
        ListEmptyComponent={<Text>List is empty</Text>}
        numColumns={2}
        initialNumToRender={6}
        removeClippedSubviews
      />
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    marginLeft: 7,
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#7494f4',
  },
});
