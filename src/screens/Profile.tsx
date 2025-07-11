import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { logout } from '../config/firebase/GoogleSignin';
import { startPayment } from '../config/razorpay/razorpayUtils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/Store';
import { clearUser } from '../redux/slices/userSlice';

const Profile = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const onlogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
      Alert.alert('✅ Logout successful');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Signin' }],
      });
    } catch (error: any) {
      console.error('Logout failed:', error);
      Alert.alert('Logout failed', error.message || 'Something went wrong');
    }
  };


  return (
    <View style={styles.container}>
      <Image source={{ uri: user.photoURL }} style={styles.avatar} />

      <Text style={styles.name}>{user.fname} {user.lname}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={onlogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
  },
  email: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: '#ff3b3b',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentBtn: {
    marginTop: 20,
    backgroundColor: '#1c468a',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 2,
  },
  paymentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
