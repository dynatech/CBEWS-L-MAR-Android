import React, { useState, createContext, Fragment } from 'react';
import { Image, ImageBackground, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ImageStyle } from '../../styles/image_style'
import { ContainerStyle } from '../../styles/container_style';
import { InputStyle } from '../../styles/input_style';
import { LabelStyle } from '../../styles/label_style';
import { ButtonStyle } from '../../styles/button_style';
import Storage from '../../reducers/Storage';
import AppConfig from '../../reducers/AppConfig';

function LoginScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigator = props.navigation;

  Storage.getItem("UserCredentials").then(response => {
    if (response != null) {
      navigator.navigate('Dashboard');
    }
  })

  const usernameChange = (text) => {
    setUsername(text)
  }

  const passwordChange = (text) => {
    setPassword(text)
  }

  const validateCredentials = () => {
    if (username == "" || password == "") {
      ToastAndroid.show("Login failed, invalid username or password.", ToastAndroid.SHORT);
    } else {
      fetch(`${AppConfig.HOSTNAME}/api/accounts/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status != false) {
            Storage.setItem("UserCredentials", responseJson.user_data)
            ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
            navigator.navigate('Dashboard');
          } else {
            ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
          console.error(error);
        }
      );
    }
  }

  return (
    <Fragment>
      <ImageBackground style={ImageStyle.background} source={require('../../assets/login_screen.png')} blurRadius={1}>
        <View style={ContainerStyle.content}>
          <View style={ContainerStyle.seals}>
            <Image style={ImageStyle.seal} source={require('../../assets/dost_seal.png')}></Image>
            <Image style={ImageStyle.seal} source={require('../../assets/dynaslope_seal.png')}></Image>
            <Image style={ImageStyle.seal} source={require('../../assets/mar_seal.png')}></Image>
            <Image style={ImageStyle.seal} source={require('../../assets/leon_seal.png')}></Image>
          </View>
          <View style={ContainerStyle.login_content}>
            <Text style={[LabelStyle.large_label, LabelStyle.default, InputStyle.white]}>Community Based Early Warning Information for Landslides</Text>
            <TextInput style={[InputStyle.large, InputStyle.default, InputStyle.white]} placeholder="Username" placeholderTextColor="#fff" onChangeText={text => { usernameChange(text) }}></TextInput>
            <TextInput style={[InputStyle.large, InputStyle.default, InputStyle.white]} secureTextEntry={true} placeholder="Password" placeholderTextColor="#fff" onChangeText={text => { passwordChange(text) }}></TextInput>
            <TouchableOpacity style={ButtonStyle.large} onPress={() => validateCredentials()}>
              <Text style={ButtonStyle.large_text}>Sign in</Text>
            </TouchableOpacity>
            <Text style={[LabelStyle.medium_label, LabelStyle.brand]} onPress={() => { 
              navigator.navigate('ForgotPassword'); 
          }}>Forgot password?</Text>
            <Text style={[LabelStyle.medium_label, LabelStyle.brand]} onPress={() => { 
              navigator.navigate('QuickRegistration'); 
          }}>Create account</Text>
          </View>
        </View>
      </ImageBackground>
    </Fragment>
  )
}

export default LoginScreen