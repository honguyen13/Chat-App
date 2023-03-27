import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
} from 'react-native';

import {signInWithEmailAndPassword} from 'firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../constants/Colors';

import {auth} from '../config/firebase/firebase';

const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

  //states to store email/password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    //states to validation email/password
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const openRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        if (userCredential) {
          navigation.navigate('Chat');
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorEmail('That email address is already in use!');
        } 
        if (error.code === 'auth/invalid-email') {
          setErrorEmail('That email address is invalid!');
        } 
        if (error.code === 'auth/wrong-password') {
          setErrorPassword('That password is invalid!');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 32,
          color: 'black',
          fontFamily: 'Roboto-Medium',
          textAlign: 'center',
          marginTop: 60,
        }}>
        Welcome,
      </Text>
      <Text
        style={{
          fontSize: 30,
          color: 'black',
          fontFamily: 'Roboto-Light',
          textAlign: 'center',
          marginBottom: 40,
        }}>
        Glad to see you!
      </Text>
      {errorEmail == '' ? null : (
        <Text style={{color: Colors.warning, paddingLeft: 5, paddingBottom: 5}}>
          {errorEmail}
        </Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setEmail(text);
        }}
        value={email}
        placeholder="example@gmail.com"
      />
      {errorPassword == '' ? null : (
        <Text style={{color: Colors.warning, paddingLeft: 5, paddingBottom: 5}}>
          {errorPassword}
        </Text>
      )}
      <View
        style={[
          styles.input,
          {flexDirection: 'row', alignItems: 'center', paddingRight: 10},
        ]}>
        <TextInput
          style={{flex: 1}}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{width: 120, alignSelf: 'flex-end'}}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Roboto-Regular',
            textAlign: 'right',
          }}>
          Recovery Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text
          style={{color: '#FFF', fontSize: 18, fontFamily: 'Roboto-Medium'}}>
          Sign in
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{height: 1, backgroundColor: '#ccc', flex: 1}} />
        <Text
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: 12,
            marginHorizontal: 10,
          }}>
          Or continue with
        </Text>
        <View style={{height: 1, backgroundColor: '#ccc', flex: 1}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 40,
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: Colors.lightGray,
            height: 60,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            style={{height: 30, width: 30}}
            resizeMode="contain"
            source={require('../../assets/images/google-logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: Colors.lightGray,
            height: 60,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            style={{height: 30, width: 30}}
            resizeMode="contain"
            source={require('../../assets/images/facebook-logo.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <Text
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
          }}>
          don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={openRegisterScreen}>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
              color: Colors.blue,
            }}>
            Sign up now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 30,
  },
  button: {
    marginVertical: 40,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    marginBottom: 20,
    backgroundColor: '#FFF',
    paddingLeft: 15,
    borderRadius: 10,
  },
});

export default Login;
