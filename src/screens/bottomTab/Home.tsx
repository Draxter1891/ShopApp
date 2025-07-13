import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import LoaderKitView from 'react-native-loader-kit';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { toggleFavorite } from '../../redux/slices/favouriteSlice';
import ProductsCard from '../../components/ProductsCard';
import { addToCart } from '../../redux/slices/cartSlice';
import CustomCarousel from '../../components/CustomCarousel';
import Header from '../../components/Header';
import CustomModal from '../../components/CustomModal';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  isFav?: boolean;
}

const Home = ({ navigation }: { navigation: any }) => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector((state: RootState) => state.favourite.items);
  const user = useSelector((state: RootState) => state.user);

  // const fetchCategories = async () => {
  //   try {
  //     const res = await axios.get(
  //       'https://fakestoreapi.com/products/categories',
  //     );
  //     setCategories(res.data);
  //   } catch (err) {
  //     console.log('Error fetching categories', err);
  //   }
  // };

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

  // const fetchProductsByCategory = async (category: string) => {
  //   setloading(true);
  //   try {
  //     const res = await axios.get(
  //       `https://fakestoreapi.com/products/category/${category}`,
  //     );
  //     setproducts(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setloading(false);
  //   }
  // };

  useEffect(() => {
    fetchData();
    // fetchCategories();
  }, []);

  const handleToggleFavorite = (product: Product) => {
    dispatch(toggleFavorite(product));
  };
  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item));
    setModalMessage('Item added to cart');
    setShowModal(true);
  };
  const renderItems = useCallback(
    ({ item }: any) => {
      const isFav = favourites.some(fav => fav.id === item.id);
      return (
        <ProductsCard
          product={{ ...item, isFav }}
          onToggleFavourite={() => handleToggleFavorite(item)}
          onAddToCart={handleAddToCart}
        />
      );
    },
    [favourites],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header text="Shop." />
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
          style={styles.userBtn}
        >
          <Text style={styles.userText}>Hi, {user.fname}!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.carouselContainer}>
        <CustomCarousel />
      </View>

      {loading ? (
        <LoaderKitView
          style={styles.loader}
          name={'BallClipRotate'}
          animationSpeedMultiplier={0.8}
          color={'#1c468a'}
        />
      ) : (
        <FlatList
          data={products}
          refreshing={loading}
          keyExtractor={(item: Product) => item.id.toString()}
          renderItem={renderItems}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No products found.</Text>
            </View>
          )}
          initialNumToRender={6}
          removeClippedSubviews
        />
      )}
      <CustomModal
        title="Success"
        visible={showModal}
        message={modalMessage}
        mode="alert"
        onCancel={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
  },

  brand: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4e5fff',
  },

  userBtn: {
    backgroundColor: '#d8e8f6',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  userText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3a4ba0',
  },

  carouselContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  productList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 20,
    gap: 14,
  },

  loader: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
  },

  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },

  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
