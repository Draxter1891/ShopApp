import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = ({ style,text }: any) => {
  return (
    <View style={{ position: 'absolute', top: 10, left: 15 }}>
      <Text style={style}>{text}</Text>
    </View>
  );
};

export default Header;
