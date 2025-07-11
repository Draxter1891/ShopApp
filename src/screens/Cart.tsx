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
} from '../redux/slices/cartSlice';
import { RootState, AppDispatch } from '../redux/Store';
import Icon from 'react-native-vector-icons/Ionicons';
import { startPayment } from '../config/razorpay/razorpayUtils';

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, totalAmount } = useSelector(
    (state: RootState) => state.cart
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
        <Text style={styles.price}>₹ {item.price}</Text>

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
        Alert.alert('Something went wrong please try again.');
      }
    };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={{ fontSize: 18, color: '#888' }}>🛒 Cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ₹ {totalAmount.toFixed(2)}</Text>
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
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#7494f4',
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  qtyBtn: {
    backgroundColor: '#e0e0e0',
    padding: 6,
    borderRadius: 6,
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  checkoutBtn: {
    marginTop: 10,
    backgroundColor: '#3f407cff',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
