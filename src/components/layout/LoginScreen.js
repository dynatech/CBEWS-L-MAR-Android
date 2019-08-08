import React, { Component } from 'react';
import { Image, ImageBackground, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ImageStyle } from '../../styles/image_style'
import { ContainerStyle } from '../../styles/container_style';
import { InputStyle } from '../../styles/input_style';
import { LabelStyle } from '../../styles/label_style';
import { ButtonStyle } from '../../styles/button_style';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  validateCredentials() {
    ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
        <ImageBackground style={ImageStyle.background} source={require('../../assets/login_screen.png') } blurRadius={1}>
            <View style={ContainerStyle.content}>
                <View style={ContainerStyle.seals}>
                    <Image style={ImageStyle.seal} source={require('../../assets/mar_seal.png')}></Image>
                    <Image style={ImageStyle.seal} source={require('../../assets/leon_seal.png')}></Image>
                    <Image style={ImageStyle.seal} source={require('../../assets/dynaslope_seal.png')}></Image>
                    <Image style={ImageStyle.seal} source={require('../../assets/dost_seal.png')}></Image>
                </View>
                <View style={ContainerStyle.login_content}>
                    <Text style={[LabelStyle.large_label, LabelStyle.default, InputStyle.white]}>Community Based Early Warning Information for Landslides</Text>
                    <TextInput style={[InputStyle.large, InputStyle.default, InputStyle.white]} placeholder="Username" placeholderTextColor="#fff" ></TextInput>
                    <TextInput style={[InputStyle.large, InputStyle.default, InputStyle.white]} placeholder="Password" placeholderTextColor="#fff" ></TextInput>
                    <Text></Text>
                    <Text></Text>
                    <TouchableOpacity style={ButtonStyle.large} onPress={()=> this.validateCredentials()}>
                        <Text style={ButtonStyle.large_text}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
  }
}
