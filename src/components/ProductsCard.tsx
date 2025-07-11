import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  isFav?: boolean;
}
interface Props {
  product: Product;
  onToggleFavourite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductsCard: FC<Props> = ({
    product,onAddToCart,onToggleFavourite
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <TouchableOpacity
        onPress={() => onToggleFavourite(product)}
        style={styles.heartIcon}>
        <Icon
          name={product.isFav ? 'heart' : 'heart-outline'}
          size={22}
          color={product.isFav ? 'red' : '#555'}
        />
      </TouchableOpacity>

      <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₹ {product.price.toFixed(2)}</Text>

      <TouchableOpacity style={styles.cartBtn} onPress={() => onAddToCart(product)}>
        <Text style={styles.cartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductsCard;

const styles = StyleSheet.create({
    card: {
    backgroundColor: '#fff',
    width: '46%',
    borderRadius: 12,
    padding: 10,
    margin: 8,
    elevation: 3,
    shadowColor: '#000',
  },
  image: {
    height: 120,
    width: '100%',
    borderRadius: 8,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 6,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 50,
  },
  cartBtn: {
    marginTop: 6,
    backgroundColor: '#222',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  cartText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
