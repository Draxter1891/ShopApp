import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RoundedButtons from '../components/RoundedButtons';
import Header from '../components/Header';

const Signin = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <Header style={styles.logo} text={"Shop."}/>
      <Text style={styles.heading}>Hello!</Text>
      <Text style={styles.subheading}>Welcome to our shop.</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{
            navigation.navigate("Home")
          }}
        >
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>

        <TouchableHighlight
          style={[
            styles.button,
            {
              backgroundColor: '#e7f6fa',
              borderColor: '#7494f4',
              borderWidth: 1,
            },
          ]}
          underlayColor="#d3dceb"
          onPress={() => {
            navigation.navigate("Signup")
          }}
        >
          <Text style={[styles.btnTxt, { color: '#5d6470' }]}>Signup</Text>
        </TouchableHighlight>
      </View>
      <Text style={{ marginTop: 30, color: '#747c8a' }}>or login with </Text>
      <TouchableOpacity style={{position:'absolute',bottom:'15%'}}>
        <RoundedButtons
          image={require('../assets/images/googleLogo.png')}
          bg={'#fff'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7f6fa',
  },
  logo:{
    fontSize:35,
    fontWeight:'bold',
    color:'#1e4266'
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  button: {
    backgroundColor: '#7494f4',
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 30,
  },
  btnTxt: {
    color: '#e7f6fa',
    fontWeight: '600',
  },
  
});
