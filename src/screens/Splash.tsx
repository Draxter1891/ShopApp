import { View, Text, ImageBackground, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LoaderKitView } from 'react-native-loader-kit';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';

const Splash = ({ navigation }: any) => {
  const [loading, setloading] = useState(true);
  const user = useSelector((state:RootState) => state.user);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      if (user.isLoggedIn) {
        navigation.replace('Cart');
      } else {
        navigation.replace('Signin');
      }
    }, 1000);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/splash.png')}
      style={{ flex: 1, justifyContent: 'center' }}
      resizeMode="cover"
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 50,
          fontWeight: '600',
          position: 'absolute',
          bottom: '30%',
          alignSelf: 'center',
        }}
      >
        Shop
      </Text>
      {loading && (
        <LoaderKitView
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            bottom: '20%',
            alignSelf: 'center',
          }}
          name={'BallPulseSync'}
          animationSpeedMultiplier={0.8} 
          color={'#e7f6fa'} 
        />
      )}
    </ImageBackground>
  );
};

export default Splash;
