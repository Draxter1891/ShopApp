import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import LoaderKitView from 'react-native-loader-kit';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/Store';
import { toggleFavorite } from '../redux/slices/favouriteSlice';
import ProductsCard from '../components/ProductsCard';


interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  isFav?: boolean;
}


const Home = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector((state: RootState) => state.favourite.items);

  const fetchData = async () => {
    try {
      setloading(true);
      const response: any = await axios.get(
        'https://fakestoreapi.com/products',
      );
      setproducts(response.data);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch products.');
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleFavorite = (product: any) => {
    dispatch(toggleFavorite(product));
  };

  const renderItems = useCallback(
    ({ item }: any) => {
      const isFav = favourites.some(fav => fav.id === item.id);
      return (
        <ProductsCard
          product={{ ...item, isFav }}
          onToggleFavourite={() => handleToggleFavorite(item)}
          onAddToCart={() => Alert.alert('Item added to cart')}
        />
      );
    },
    [favourites],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Products</Text>
      {loading ? (
        <LoaderKitView
          style={styles.loader}
          name={'BallClipRotate'}
          animationSpeedMultiplier={0.8}
          color={'#1c468a'}
        />
      ) : (
        <FlatList
        refreshing={loading}
        data={products}
        keyExtractor={(item: Product) => item.id.toString()}
        renderItem={renderItems}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }
          ListEmptyComponent={() => (
            <View>
              <Text>No products found.</Text>
            </View>
          )}
          initialNumToRender={6}
          removeClippedSubviews
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#7494f4',
  },
  subheading: {
    fontSize: 13,
    color: '#747c8a',
  },
  products: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  loader: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: '50%',
    alignSelf: 'center',
  },
});
