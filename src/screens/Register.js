import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {auth} from '../config/firebase/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {Colors} from '../constants/Colors';
import {Image} from 'react-native';
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from '../utilies/Validations';

const Register = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorRetypePassword, setErrorRetypePassword] = useState('');

  const [avatar, setAvatar] = useState('');

  const openLoginScreen = () => {
    navigation.navigate('Login');
  };

  const isValidationOK = () =>
    name.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) == true &&
    isValidPassword(password) == true &&
    password == retypePassword;

  const registerUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Registered
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: avatar
            ? avatar
            : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
        })
          .then(() => {
            alert('Registered, please login.');
          })
          .catch(error => {
            alert(error.message);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorEmail('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          setErrorEmail('That email address is invalid!');
        }
        if (error.code === 'auth/internal-error') {
          setErrorPassword('Please enter password!');
        }
        if (error.code === 'auth/weak-password') {
          setErrorPassword('Password should be at least 6 characters!');
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: 32,
          color: 'black',
          fontFamily: 'Roboto-Medium',
          textAlign: 'center',
          marginTop: 60,
        }}>
        Create Account
      </Text>
      <Text
        style={{
          fontSize: 30,
          color: 'black',
          fontFamily: 'Roboto-Light',
          textAlign: 'center',
          marginBottom: 40,
        }}>
        to get started now!
      </Text>
      {errorName == '' ? null : (
        <Text style={{color: Colors.warning, paddingLeft: 5, paddingBottom: 5}}>
          {errorName}
        </Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
        placeholder="Enter your name"
      />
      {errorEmail == '' ? null : (
        <Text style={{color: Colors.warning, paddingLeft: 5, paddingBottom: 5}}>
          {errorEmail}
        </Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setErrorEmail(
            isValidEmail(text) == true ? '' : 'Email not in correct format',
          );
          setEmail(text);
        }}
        value={email}
        placeholder="Enter your email"
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
      {errorRetypePassword == '' ? null : (
        <Text style={{color: Colors.warning, paddingLeft: 5, paddingBottom: 5}}>
          {errorRetypePassword}
        </Text>
      )}
      <View
        style={[
          styles.input,
          {flexDirection: 'row', alignItems: 'center', paddingRight: 10},
        ]}>
        <TextInput
          style={{flex: 1}}
          onChangeText={text => setRetypePassword(text)}
          value={retypePassword}
          placeholder="Enter your password again"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={isValidationOK() == false}
        style={[
          styles.button,
          {
            backgroundColor:
              isValidationOK() == true ? Colors.red : Colors.inactive,
            elevation: isValidationOK() == true ? 5 : 0,
          },
        ]}
        onPress={registerUser}>
        <Text
          style={{color: '#FFF', fontSize: 18, fontFamily: 'Roboto-Medium'}}>
          Sign up
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
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <Text
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
          }}>
          already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={openLoginScreen}>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
              color: Colors.blue,
              marginBottom: 60,
            }}>
            Sign in now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  input: {
    height: 50,
    marginBottom: 20,
    backgroundColor: '#FFF',
    paddingLeft: 15,
    borderRadius: 10,
  },
});

export default Register;
