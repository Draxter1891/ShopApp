import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { logout } from '../../config/firebase/GoogleSignin';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { clearUser } from '../../redux/slices/userSlice';
import Header from '../../components/Header';

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
      <View style={styles.topHeader}>
        <Header text={'Shop.'} />
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.card}>
        <Image source={{ uri: user.photoURL }} style={styles.avatar} />

        <Text style={styles.name}>
          {user.fname} {user.lname}
        </Text>
        <Text style={styles.email}>{user.email}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={onlogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
    
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e3e7f1',
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5c74e5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#d8e8f6',
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  logoutBtn: {
    marginTop: 10,
    backgroundColor: '#f0201dff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 2,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
