import React, { Component, useState, Fragment } from 'react';
import { Image, ImageBackground, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AppConfig from '../../reducers/AppConfig';
import { ImageStyle } from '../../styles/image_style'
import { ContainerStyle } from '../../styles/container_style';
import { InputStyle } from '../../styles/input_style';
import { LabelStyle } from '../../styles/label_style';
import { ButtonStyle } from '../../styles/button_style';

export default class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  validateCredentials() {
    if (this.state.username == "" || this.state.password == "") {
      ToastAndroid.show("Login failed, invalid username or password.", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
      this.props.navigation.navigate('Dashboard');
    }
  }

  render() {
    return (
      <Fragment>
        <View style={{flex: 1}}>
          <View style={register_styles.inputContainer}>
            <TextInput placeholder="First name: E.g. Juan" onChangeText={text => this.setState({ first_name: text })} />
            <TextInput placeholder="Last name: E.g. Dela Cruz" onChangeText={text => this.setState({ last_name: text })} />
            <View style={[{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 10 }]}>
              <View style={{ width: '20%', justifyContent: 'center' }}>
                <Text>Gender: </Text>
              </View>
              <View style={{ width: '40%' }}>
                <Picker
                  selectedValue={this.state.sex}
                  style={{ width: '100%' }}
                  itemStyle={{ textAlign: 'center' }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ sex: itemValue })
                  }>
                  <Picker.Item label="Male" value="M" />
                  <Picker.Item label="Female" value="F" />
                </Picker>
              </View>
            </View>
            <TextInput placeholder="Birthday: E.g. 1988-07-27" onChangeText={text => this.setState({ birthday: text })} />
            <TextInput placeholder="Mobile number: E.g. 09123456789" onChangeText={text => this.setState({ mobile_number: text })} />
            <TextInput placeholder="Username" onChangeText={text => this.setState({ username: text })} />
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={text => this.setState({ password: text })} />
            <TextInput secureTextEntry={true} placeholder="Confirm Password" onChangeText={text => this.setState({ confirm_password: text })} />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.validateFields()}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
    );
  }
}
