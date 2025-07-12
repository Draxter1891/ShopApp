import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = ({ text }: { text: string }) => {
  return <Text style={styles.logo}>{text}</Text>;
};

export default Header;
const styles = StyleSheet.create({
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#5ab7d4',
    marginBottom: 20,
  },
});
