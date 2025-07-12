import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  calculateTotal,
  clearCart,
} from '../../redux/slices/cartSlice';
import { RootState, AppDispatch } from '../../redux/Store';
import Icon from 'react-native-vector-icons/Ionicons';
import { startPayment } from '../../config/razorpay/razorpayUtils';
import Header from '../../components/Header';

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, totalAmount } = useSelector(
    (state: RootState) => state.cart,
  );

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  const handleRemove = (id: number) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: () => dispatch(removeFromCart(id)),
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>

        <View style={styles.qtyContainer}>
          <TouchableOpacity
            onPress={() => dispatch(decreaseQty(item.id))}
            style={styles.qtyBtn}
          >
            <Icon name="remove" size={18} color="#000" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => dispatch(increaseQty(item.id))}
            style={styles.qtyBtn}
          >
            <Icon name="add" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Icon name="trash-outline" size={24} color="#d11a2a" />
      </TouchableOpacity>
    </View>
  );

  const handlePayment = async () => {
    try {
      const data = await startPayment({
        amount: totalAmount,
        name: 'Rishabh Tripathi',
        email: 'trishabh2001@gmail.com',
      });
      dispatch(clearCart());
      Alert.alert('Payment Successful');
    } catch (error: any) {
      Alert.alert('Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Header text={'Shop.'} />
        <Text style={styles.heading}>Your Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
          <Text style={styles.subText}>Start adding some items!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total: ₹ {totalAmount.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handlePayment}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
  },
  topHeader: {
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
    marginBottom:10
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#5a72ee',
    marginVertical: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
    gap: 10,
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    borderRadius: 6,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyBtn: {
    backgroundColor: '#dcdff1',
    padding: 6,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2b2b2b',
  },
  checkoutBtn: {
    marginTop: 12,
    backgroundColor: '#3f407c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#a0a0a0',
  },
  subText: {
    marginTop: 4,
    fontSize: 14,
    color: '#8f9bb3',
  },
});
