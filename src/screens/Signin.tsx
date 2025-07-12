import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import RoundedButtons from '../components/RoundedButtons';
import Header from '../components/Header';
import { _signinWithGoogle, logout } from '../config/firebase/GoogleSignin';
import { SignInParams, SignInResponse } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { AppDispatch } from '../redux/Store';

type GoogleUser = {
  email: string | null;
  givenName: string | null;
  familyName: string | null;
  name: string | null;
  photo: string | null;
}

type SigninResult = {
  user:GoogleUser;
}

const Signin = ({navigation}:any) => {
  // const [data, setdata] = useState([])
  const dispatch = useDispatch<AppDispatch>();

  //SIGNIN
  const googleSignin = async (): Promise<void> => {
  try {
    const res:SignInResponse| null = await _signinWithGoogle();
    
    if (!res || !res.data ) {
      console.log('❌ Error: No user data found');
      return;
    }
    const {user} = res.data;
    dispatch(setUser({
       fname: user.givenName ?? 'name not found',
      lname: user.familyName ?? 'name not found',
      email: user.email ?? 'email not found',
      photoURL: user.photo ?? 'no image to display'
    }))

    console.log('[Google Sign-In Success]', JSON.stringify(user, null, 2));

    navigation.replace('Main')

  } catch (error) {
    console.error('🚨 Google Sign-In failed:', error);
  }


};
  return (
    <View style={styles.container}>
      <Header text={"Shop."}/>
      <Text style={styles.heading}>Hello!</Text>
      <Text style={styles.subheading}>Welcome to our shop.</Text>
      <View style={styles.btnContainer}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={()=>{
            navigation.navigate("Home")
          }}
        >
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity> */}

        {/* <TouchableHighlight
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
        </TouchableHighlight> */}
      </View>
      <Text style={{ marginTop: 20, color: '#747c8a' }}>login with your google account to continue</Text>
      <TouchableOpacity style={{position:'absolute',bottom:'30%'}} onPress={googleSignin}>
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
