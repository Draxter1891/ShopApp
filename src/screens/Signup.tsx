import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import InputField from '../components/InputField';

const Signup = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header style={styles.logo} text={'Shop.'} />

      <View style={{marginTop: '40%', marginLeft: '5%' }}>
        <Text style={styles.heading}>Signup</Text>
        <Text style={styles.subHeading}>Signup here</Text>
        <InputField placeholder={'username'} keyboard={'email-address'} />
        <InputField
          placeholder={'password'}
          keyboard={'default'}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.btnTxt}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1e4266',
  },
  heading: { fontSize: 25, fontWeight: 'bold', color: '#7494f4' },

  subHeading: { fontSize: 13, color: '#747c8a', marginBottom: '30%' },
  button: {
    backgroundColor: '#7494f4',
    width: 105,
    paddingHorizontal: 30,
    paddingVertical: 13,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop:20
  },
  btnTxt: {
    color: '#e7f6fa',
    fontWeight: '600',
  },
});
