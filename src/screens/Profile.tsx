import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { logout } from '../config/firebase/GoogleSignin';
// import { startPayment } from '../config/razorpay/razorpayUtils';

const Profile = ({navigation}:any) => {
    const route = useRoute();
  const { image, fname, lname, email } = route.params as {
    image: string;
    fname: string;
    lname: string;
    email: string;
  };
    console.log(image,fname,lname,email)
    const onlogout = async()=>{
        await logout();
        Alert.alert("logout successful")
        navigation.navigate('Signin')
    }
  //   const handlePayment = async () => {
  //   try {
  //     const data = await startPayment({
  //       amount: 101,
  //       name: 'Rishabh Tripathi',
  //       email: 'temp062401@gmail.com',
  //       contact: '9650727640',
  //     });
  //     Alert.alert('Payment Successful', JSON.stringify(data));
  //   } catch (error: any) {
  //     Alert.alert('Payment Failed', error?.description || 'Something went wrong');
  //   }
  // };
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Image source={{uri:image}} style={{width:50,height:50}}/>
      <Text>{fname}</Text>
      <Text>{lname}</Text>
      <Text>{email}</Text>
      <Button title='logout' onPress={onlogout}/>
      <TouchableOpacity style={{justifyContent:'center',alignItems:'center',backgroundColor:'#000', width:'30%',alignSelf:'center',marginTop:20,borderRadius:30}}
      // onPress={handlePayment}
      >
        <Text style={{fontSize:18,fontWeight:'500', paddingHorizontal:12,paddingVertical:10,color:'#fff'}}>Pay here</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})