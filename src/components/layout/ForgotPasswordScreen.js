import React, { Component, useState, Fragment } from 'react';
import { Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ContainerStyle } from '../../styles/container_style'
import { LabelStyle } from '../../styles/label_style';
import { InputStyle } from '../../styles/input_style';
import { ButtonStyle } from '../../styles/button_style';

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <Fragment>
        <View style={[ContainerStyle.content, {justifyContent: 'center'}]}>
          <Text style={[LabelStyle.medium_label, {textAlign: 'center'}]}>Please enter your username or phone number to reset the password for your account.</Text>
          <TextInput style={[InputStyle.large, {textAlign: 'center'}]} placeholder="E.g. 09123456789 or JuanDC" keyboardType={'numeric'} onChangeText={text => {}} />
          <TouchableOpacity onPress={() => {}} style={ButtonStyle.large}>
            <Text style={ButtonStyle.large_text}>Reset</Text>
          </TouchableOpacity>
          <Text style={[LabelStyle.medium_label, {textAlign: 'center'}]}>A new password will be sent to your mobile number via SMS.</Text>
        </View>
      </Fragment>
    );
  }
}