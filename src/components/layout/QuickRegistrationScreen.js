import React, { Component, useState, Fragment } from 'react';
import { ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ContainerStyle } from '../../styles/container_style';
import { InputStyle } from '../../styles/input_style';
import { ButtonStyle } from '../../styles/button_style';
import AppConfig from '../../reducers/AppConfig';
import SpinnerLoader from '../../reducers/Spinner';

function QuickRegistrationScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [openLoader , setOpenLoader] = useState(false);

  const usernameChange = (text) => {
    setUsername(text);
  }

  const passwordChange = (text) => {
    setPassword(text);
  }

  const rePasswordChange = (text) => {
    setRepassword(text);
  }

  const mobileChange = (text) => {
    setMobileNumber(text);
  }

  const confirmCredentials = () => {
    setOpenLoader(true);
    let confirm_status = true;
    let confirm_message = []

    if (mobile_number.length != 11) {
      confirm_status = false;
      confirm_message.push("Invalid mobile number")
    }
    if ((password != repassword) || (password == "" || repassword == "")) {
      confirm_status = false;
      confirm_message.push("Invalid / Password does not match")
    }

    if (confirm_status == false) {
      let err = "";
      if (confirm_message.length == 1) {
        err = confirm_message[0] + ", please review the required fields.";
      } else {
        confirm_message.forEach(error_message => {
          err = err +", "+error_message
        });
        err += ", please review the required fields.";
        err = err.substr(2)
      }
      ToastAndroid.show(err, ToastAndroid.LONG);
    } else {

        fetch(`${AppConfig.HOSTNAME}/api/accounts/signup`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username": username,
            "password": password,
            "mobile_number": mobile_number,
            "site_id": AppConfig.CONFIG.site_id,
            "site_code": AppConfig.CONFIG.site_code
          }),
        }).then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status == false) {
              ToastAndroid.show("Registration failed, please contact administrator for further assistance.", ToastAndroid.LONG);
            } else {
              setOpenLoader(false);
              setTimeout(()=> {
                ToastAndroid.show("Registration complete, please wait for the confirmation.", ToastAndroid.LONG);
                props.navigation.navigate("Login")
              }, 3000)
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
      <ScrollView>
        <View style={ContainerStyle.content}>
          <View>
            <TextInput style={InputStyle.large} placeholder="Mobile number: E.g. 09123456789" maxLength={11} minLength={11} keyboardType={'numeric'} onChangeText={text => { mobileChange(text)}} />
            <TextInput style={InputStyle.large} placeholder="Username" onChangeText={text => { usernameChange(text)}} />
            <TextInput style={InputStyle.large} secureTextEntry={true} placeholder="Password" onChangeText={text => { passwordChange(text)}} />
            <TextInput style={InputStyle.large} secureTextEntry={true} placeholder="Confirm Password" onChangeText={text => { rePasswordChange(text)}} />
          </View>
          <View style={{paddingTop: '10%'}}>
            <TouchableOpacity style={ButtonStyle.large} onPress={() => confirmCredentials() }>
              <Text style={ButtonStyle.large_text}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <SpinnerLoader display={openLoader} />
    </Fragment>
  );
}

export default QuickRegistrationScreen;