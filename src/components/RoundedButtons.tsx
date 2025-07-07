import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const RoundedButtons = ({ image, bg}: any) => {
  return (
    <View
    style={{backgroundColor:bg,width:50,height:50,justifyContent:'center',alignItems:'center',borderRadius:25}}
    >
      <Image
        source={image}
        style={{ height: 25, width: 25 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default RoundedButtons;

const styles = StyleSheet.create({});
