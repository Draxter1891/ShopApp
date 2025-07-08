import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoaderKitView from 'react-native-loader-kit';

const Home = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    setloading(true);
    try {
      const response: any = await axios.get(
        'https://fakestoreapi.com/products',
      );
      setproducts(response.data);
    } catch (error) {
      Alert.alert('error', 'error fetching data!');
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setloading(true);
    fetchData();
  }, []);

  const renderItems = ({ item }: any) => (
    <View style={styles.products}>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={{ height: 60, width: 60 }}
        />
      </View>
      <View style={{marginLeft:30,width:'100%',alignContent:'center'}}>
        <Text style={{fontSize:17,flexWrap:'wrap'}}>{item.title}</Text>
        <Text style={{fontSize:12,flexWrap:'wrap'}}>{item.description}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Products</Text>
      {loading === true ? (
        <LoaderKitView
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            bottom: '50%',
            alignSelf: 'center',
          }}
          name={'BallClipRotate'}
          animationSpeedMultiplier={0.8} // speed up/slow down animation, default: 1.0, larger is faster
          color={'#1c468a'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
        />
      ) : (
        <FlatList
        showsVerticalScrollIndicator={false}
          refreshing={loading}
          data={products}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderItems}
          ListEmptyComponent={() => (
            <View>
              <Text>no element</Text>
            </View>
          )}
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
  products:{
    flexDirection:'row'
    ,width:'95%'
    ,justifyContent:'space-between',
    marginTop:30
  }
});
